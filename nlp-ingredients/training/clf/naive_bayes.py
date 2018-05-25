import re
from nltk import NaiveBayesClassifier
from nltk.classify import apply_features, accuracy
from .core import BaseClassifier

class NaiveBayesCLF(BaseClassifier):
    def __init__(self):
        self.CLF = NaiveBayesClassifier

    def classify_many(self, features):
        return self.CLF.classify_many(features)

    def train_model(self, train_data):
        self.CLF = self.CLF.train(train_data)

    def test_model(self, test_data):
        return accuracy(self.CLF, test_data)

    def most_informative_features(self, num_features):
        return self.CLF.show_most_informative_features(num_features)
