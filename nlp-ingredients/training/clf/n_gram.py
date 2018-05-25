import nltk
from .core import BaseClassifier

class NGramClassifier(BaseClassifier):
    def __init__(self, default_tag):
        self.DEFAULT_TAG = default_tag;

    def classify_many(self, features):
        return [self.CLF.classify(f) for f in features]

    def train_model(self, train_sents):
        clf0 = nltk.DefaultTagger(self.DEFAULT_TAG)
        clf1 = nltk.UnigramTagger(train_sents, backoff=clf0)
        clf2 = nltk.BigramTagger(train_sents, backoff=clf1)
        clf3 = nltk.TrigramTagger(train_sents, backoff=clf2)
        self.set_classifier(clf3)
        self.set_all_classifiers([clf0, clf1, clf2, clf3])

    def test_model(self, test_sents):
        if not hasattr(self, 'CLF'):
            raise AttributeError('You must train the model first.')
        return self.CLF.evaluate(test_sents)

    def set_classifier(self, clf):
        self.CLF = clf

    def set_all_classifiers(self, clfs):
        self.ALL_CLFS = clfs
