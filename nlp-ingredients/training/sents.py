import numpy as np
from .helpers import *

""" Labels:
        NAME
        QUANTITY
        UNIT
        COMMENT
        OTHER

    Note: punctuations - i.e. ().!? etc. - are their own labels
"""

# For development
def create_mini_df(N=50000):
    sents = nyt_to_sents()
    save_pickle(sents[:N], './data/nyt_mini.pickle')

def remove_useless_text_from_nyt(df):
    """ Remove unnecessary tokens from raw input

        Example: ()      -> empty parentheses
                 <a><a/> -> HTML tags


        We only want to remove the HTML tags, not the content within the tags
        So we must remove the closing tag before the opening tag
            * i.e. <a>see link</a>  =>  see link
            * r'</.*>'
            * r'<.*>'
    """
    new_df = df.copy()
    # Input
    new_df.input.replace(r'<.*>', '', regex=True, inplace=True) # remove html tags, ex: <h1>hello</h1>
    new_df.input.replace(r'\(\)', '', regex=True, inplace=True) # remove parentheses, ex: '()'
    new_df.input.replace(r'\n', ' ', regex=True, inplace=True)
    new_df.input.replace('', None, regex=True, inplace=True)
    # Name
    new_df.name.replace(r'</.*>', '', regex=True, inplace=True)
    new_df.name.replace(r'<.*>', '', regex=True, inplace=True)
    new_df.name.replace(r'\(\)', '', regex=True, inplace=True) # remove parentheses, ex: '()'
    new_df.name.replace(r'\n', ' ', regex=True, inplace=True)
    new_df.name.replace('', None, regex=True, inplace=True)
    # Comment
    new_df.comment.replace(r'</.*>', '', regex=True, inplace=True)
    new_df.comment.replace(r'<.*>', '', regex=True, inplace=True)
    new_df.comment.replace(r'\(\)', '', regex=True, inplace=True) # remove parentheses, ex: '()'
    return new_df

def nyt_to_sents():
    df = get_dataframe('./data/nyt-ingredients-snapshot-2015.csv')
    df = remove_useless_text_from_nyt(df)
    df = df.dropna(subset=['name', 'input'])
    sents = []

    for i,r in df.iterrows():
        row = []
        name = r['name']
        qty = str(r['qty'])
        # unit = str(r['unit']) + ' {}s'.format(str(r['unit']))
        unit = singularize(str(r['unit']))
        comment = str(r['comment'])
        sentence = fractions_to_floats(str(r['input']))
        words = word_tokenize(sentence)

        for w in words:
            if is_punctuation(w):
                row.append((w,w))
            elif w in name:
                row.append((w, 'NAME'))
            elif w in qty:
                row.append((w, 'QUANTITY'))
            elif w in unit:
                row.append((w, 'UNIT'))
            elif w in comment:
                row.append((w, 'COMMENT'))
            else:
                row.append((w, 'OTHER'))

        sents.append(row)

    return sents

def my_data_to_sents():
    ingredients = pd.read_pickle('./data/my_data_raw.pickle')
    sents = []

    for r in ingredients:
        row = []
        name = r['name']
        qty = str(r['quantity'])
        unit = str(r['unit']) + ' {}s'.format(str(r['unit']))
        comment = str(r['comment'])
        line = fractions_to_floats(r['original'])
        words = word_tokenize(line)
        for w in words:
            if is_punctuation(w):
                row.append((w,w))
            elif w in name:
                row.append((w, 'NAME'))
            elif w in qty:
                row.append((w, 'QUANTITY'))
            elif w in unit:
                row.append((w, 'UNIT'))
            elif w in comment:
                row.append((w, 'COMMENT'))
            else:
                row.append((w, 'OTHER'))

        sents.append(row)

    return sents


def sents_to_features(sents):
    features = []

    for sent in sents:
        line = []
        history = []
        for i,(word,label) in enumerate(sent):
            line.append((ingredients_features(i,word,sent,history), label))
            history.append((word,label))
        features.append(line)

    return features

def ingredients_features(idx, word, all_words, history):
    """ Feature Function used to create feature sets
        Each feature set is a dict containing properties
            of the word and its neighbors

        Params:
            idx <int>   : index of the word in the sentence
            word <str>  : current word
            all_words <Array<Tuple<Str, Str>>> : array of sents (word, label)

        Return:
            Array<Dict>
    """
    # orig_input = ' '.join([w for w,_ in all_words])
    features = {
        'word': word,
        'is_number': is_number(word),
        'suffix(1)': word[-1:],
        'suffix(2)': word[-2:] if len(word) > 1 else '',
        # 'index': idx,
        # 'sentence_length': orig_input,
        # 'num_words': len(all_words),
        # 'word_length': len(word),
        # 'is_capitalized': is_capitalized(word),
        # 'in_parentheses': is_inside_parentheses(word, orig_input),
    }

    # Add last and last_last: label, word
    # Also last two letters
    if idx == 0:
        features['last_label'] = '<START>'
        features['last_word'] = '<START>'
    else:
        features['last_label'] = history[idx-1][1]
        features['last_word'] = history[idx-1][0]
        if idx > 1:
            features['last_last_label'] = history[idx-2][1]
            features['last_last_word'] = history[idx-2][0]

    # Get next and next_next: label and word
    num_words = len(all_words)
    if idx < num_words-1:
        features['next_word'] = all_words[idx+1][0]
        if idx == num_words-2:
            features['next_word'] = '<LAST>'
        elif idx < num_words-2:
            features['next_next_word'] = all_words[idx+2][0]
            if idx == num_words-3:
                features['next_next_word'] = '<LAST>'

    return features

def is_number(word):
    """
    Returns true if the word is a number
    """
    try:
        n = float(word)
        return True
    except:
        return False

# def is_capitalized(word):
#     """
#     Returns true if any letter is capitalized
#     """
#     return re.match(r'[A-Z]', word) is not None
#
# def is_inside_parentheses(word, line):
#     """
#     Returns true if the word is inside parenthesis in the phrase.
#     """
#     if word in ['(', ')']:
#         return True
#     else:
#         return re.match(r'.*\(.*'+re.escape(word)+'.*\).*',  line) is not None
