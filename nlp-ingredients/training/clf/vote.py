from nltk.classify import ClassifierI
from statistics import mode

class VoteClassifier(ClassifierI):
    def __init__(self, *classifiers, default_classifier):
        self._classifiers = classifiers
        self._default = default_classifier or classifiers[0]

    def classify(self, sent):
        labels = []
        for c in self._classifiers:
            l = c.classify_many(sent)
            labels.append(l)

        votes = []
        errors = []
        for i in range(len(sent)):
            v  = []
            for c in range(len(self._classifiers)):
                v.append(labels[c][i])
            try:
                votes.append(mode(v))
            except Exception as e:
                errors.append([e, v])
                votes.append(self._default.classify(sent[i]))

        return votes, errors

    def confidence(self, features):
        votes = []
        for c in self._classifiers:
            v = c.classify(features)
            votes.append(v)

        choice_votes = votes.count(mode(votes))
        conf = choice_votes / len(votes)
        return conf
