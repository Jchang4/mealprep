from training.clf.n_gram import NGramClassifier
from training.helpers import save_pickle

# Classifiers
def create_ngram(trainset, testset):
    """ Create N-Gram classifier that takes in sents

        sents are of the form:
            [[('4.0', 'QUANTITY'),
              ('ounces/1.0', 'OTHER'),
              ('stick/120.0', 'OTHER'),
              ('grams', 'COMMENT'),
              ('unsalted', 'NAME'),
              ('butter', 'NAME'),
              (',', ','),
              ('cold', 'COMMENT'),
              ('and', 'COMMENT'),
              ('cut', 'COMMENT'),
              ('in', 'COMMENT'),
              ('half-inch', 'COMMENT'),
              ('chunks', 'COMMENT')],
             [('Coarse', 'COMMENT'),
              ('salt', 'NAME'),
              ('and', 'NAME'),
              ('freshly', 'COMMENT'),
              ('ground', 'COMMENT'),
              ('pepper', 'NAME'),
              ('to', 'COMMENT'),
              ('taste', 'COMMENT')],
             [('4.0', 'QUANTITY'),
              ('tablespoons', 'OTHER'),
              ('unsalted', 'NAME'),
              ('butter', 'NAME')]]
    """
    ngram_classifier = NGramClassifier('NAME')
    ngram_classifier.train_model(trainset)
    
    results = ngram_classifier.test_model(testset)
    print('N Gram Score test sents:', results*100)

    save_pickle(ngram_classifier, './classifiers/n_gram.pickle')
