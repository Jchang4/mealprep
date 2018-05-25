from nltk import word_tokenize
from training.sents import sents_to_features, is_punctuation
from training.helpers import singularize


def get_sents_from_ingredients(ingredients):
    tokens = [word_tokenize(i) for i in ingredients]
    # For each array of words, turn each word into a tuple (word, None)
    return [[(w,None) for w in words] for words in tokens]

def label_to_json(labels, sents, ingredients):
    """ With lists of labels, sents, and ingredients
        create structured data

        :param labels list<string> : list of labels, i.e. [['QUANTITY', 'UNIT', 'NAME', 'NAME'], ['QUANTITY', 'UNIT', 'NAME', 'NAME']]
        :param sents  list<string> : list of sents, i.e. [[('1', None), ('ounce', None), ('peanut', None), ('butter', None)], [('1', None), ('gallon', None), ('chicken', None), ('breast', None)]]
        :param ingredients list<string> : list of ingredients, i.e. ['1 ounce peanut butter', '1 gallon chicken breast']
    """
    results = []
    for i,line in enumerate(labels):
        words = [w[0] for w in sents[i]]
        clf = {
            'original': ingredients[i],
            'name': '',
            'quantity': '',
            'unit': '',
            'comment': '',
            'other': '',
        }
        for w_idx,label in enumerate(line):
            if is_punctuation(label):
                continue
            elif label == 'QUANTITY':
                clf['quantity'] += (words[w_idx] + ' ')
            elif label == 'UNIT':
                clf['unit'] += (singularize(words[w_idx]) + ' ')
            elif label == 'NAME':
                clf['name'] += (singularize(words[w_idx]) + ' ')
            elif label == 'COMMENT':
                clf['comment'] += (words[w_idx] + ' ')
            else:
                clf['other'] += (words[w_idx] + ' ')

        # Stip each prop in clf
        for key,val in clf.items():
            clf[key] = val.strip()

        results.append(clf)

    return results
