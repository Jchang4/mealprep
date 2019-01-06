from nltk import word_tokenize, pos_tag
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import pandas as pd
import re
import pickle

def tokenize(sentence):
    """ Change sentence into list of words """
    return word_tokenize(sentence)

def remove_stop_words(words):
    """ Remove stop words from list """
    stop_words = set(stopwords.words('english'))
    return [w for w in words if w not in stop_words]

def get_pos_tag(words):
    return pos_tag(words)

def is_punctuation(word):
    puncs = set([
        '(', ')',
        ',', '.',
        '!', '?',
    ])
    if word in puncs:
        return True
    return False

def fractions_to_floats(line):
    """ Change all fractions to floats """
    has_two_fractions = re.compile(r'(\d+)\s+(\d+)/(\d+)') # i.e. 1 1/8 => 1.13
    has_one_fraction = re.compile(r'(\d+)/(\d+)')          # i.e. 1/2   => 1.5
    one_number = re.compile(r'\d+')                        # i.e. 16, 2 => 16.0, 2.0

    def has_two_handler(n):
        fraction = float(n.group(2)) / float(n.group(3))
        num = float(n.group(1)) + fraction
        return str(round(num, 2))

    def has_one_handler(n):
        fraction = float(n.group(1)) / float(n.group(2))
        return str(round(fraction, 2))

    def one_number_handler(n):
        return str(n.group(0) + '.0')

    if has_two_fractions.search(line):
        return has_two_fractions.sub(has_two_handler, line)
    elif has_one_fraction.search(line):
        return has_one_fraction.sub(has_one_handler, line)
    elif one_number.search(line):
        return one_number.sub(one_number_handler, line)
    else:
        return line

def get_dataframe(csv_url, random=True):
    """ Get dataframe and put in random order """
    df = pd.read_csv(csv_url)
    if random:
        return df.sample(frac=1).reset_index(drop=True)
    return df

def singularize(word):
    """
        Change words from plural to singular form

        Might need to switch to pattern.en

        Reference: http://www.nltk.org/api/nltk.stem.html#module-nltk.stem.wordnet
    """
    wnl = WordNetLemmatizer()
    return wnl.lemmatize(word)

    # units = {
    #     "cups": "cup",
    #     "tablespoons": "tablespoon",
    #     "teaspoons": "teaspoon",
    #     "pounds": "pound",
    #     "ounces": "ounce",
    #     "cloves": "clove",
    #     "sprigs": "sprig",
    #     "pinches": "pinch",
    #     "bunches": "bunch",
    #     "slices": "slice",
    #     "grams": "gram",
    #     "heads": "head",
    #     "quarts": "quart",
    #     "stalks": "stalk",
    #     "pints": "pint",
    #     "pieces": "piece",
    #     "sticks": "stick",
    #     "dashes": "dash",
    #     "fillets": "fillet",
    #     "cans": "can",
    #     "ears": "ear",
    #     "packages": "package",
    #     "strips": "strip",
    #     "bulbs": "bulb",
    #     "bottles": "bottle",
    # }
    #
    # if word in units.keys():
    #     return units[word]
    # else:
    #     return word



def save_pickle(data, file_path):
    pickle.dump(data, open(file_path, 'wb'))

def load_pickle(file_path):
    return pickle.load(open(file_path, 'rb'))
