import spacy

from .helpers import fractions_to_floats, is_number, is_punctuation

nlp = spacy.load('en_core_web_sm')


def process_original_string(string):
    doc = nlp(string)
    valid_words = [token for token in doc if not token.is_stop]
    lemma = [0] * len(valid_words)
    pos = [0] * len(valid_words)
    tag = [0] * len(valid_words)
    is_alpha = [0] * len(valid_words)
    is_num = [0] * len(valid_words)
    for i, token in enumerate(valid_words):
        lemma[i] = token.lemma_
        pos[i] = token.pos_
        tag[i] = token.tag_
        is_alpha[i] = token.is_alpha
        is_num[i] = is_number(token.lemma_)
    return {
        'lemma': lemma,
        'pos': pos,
        'tag': tag,
        'is_alpha': is_alpha,
        'is_num': is_num,
    }


def ingredients_to_sents(ingredients):
    """
    Convert a list of ingredient into a list of sents

    Sents are a list of ClassifiedIngredients, which have the shape:
    {
        lemma : list of lemmatized words,
        pos : list of parts of speech,
        tag : list of more specific pos tags
        is_alpha : bool
        is_num : bool
    }

    :param ingredients Array<string>
    :return sents Array<ClassifiedIngredient>
    """
    if not ingredients:
        raise ValueError('Must provide a list of ingredients.')

    return [process_original_string(fractions_to_floats(ingr))
            for ingr in ingredients]


def sents_to_features(sents):
    if not sents:
        raise ValueError('Must provide list of sents.')
    features = []
    for token in sents:
        num_words = len(token['lemma'])
        curr_features = []
        for i in range(num_words):
            curr_features.append({
                'word': token['lemma'][i],
                'tag': token['tag'][i],
                'prev_word': token['lemma'][i-1] if i-1 >= 0 else '',
                'prev_tag': token['tag'][i-1] if i-1 >= 0 else '',
                'prev_prev_word': token['lemma'][i-2] if i-2 >= 0 else '',
                'prev_prev_tag': token['tag'][i-2] if i-2 >= 0 else '',
                'next_word': token['lemma'][i+1] if i+1 < num_words else '',
                'next_tag': token['tag'][i+1] if i+1 < num_words else '',
                'next_next_word': token['lemma'][i+2] if i+2 < num_words else '',
                'next_next_tag': token['tag'][i+2] if i+2 < num_words else '',
            })
        features.append(curr_features)
    return features


def ingredients_to_features(ingredients):
    return sents_to_features(ingredients_to_sents(ingredients))


if __name__ == '__main__':
    import pprint as pp
    ingreds = [
        '1oz baked ham',
        '1 3/4 cups of flour shaken not stirred',
        '15 grams of illicit drugs',
        '1.25 cartons of potatoes',
        '15.25 cartons of potatoes',
    ]

    sents = ingredients_to_sents(ingreds)
    features = sents_to_features(sents)

    pp.pprint(features)
