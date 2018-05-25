import pickle
import nlp.helpers as helpers
VoteCLF = pickle.load(open('./classifiers/vote.pickle', 'rb'))

def classify_ingredients(ingredients):
    sents = helpers.get_sents_from_ingredients(ingredients)
    features = helpers.sents_to_features(sents)
    labels = []
    # Get labels
    for line in features:
        f = [f for f,l in line]
        ingr,errs = VoteCLF.classify(f)
        labels.append(ingr)

    return helpers.label_to_json(labels, sents, ingredients)
