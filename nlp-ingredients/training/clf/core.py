from nltk.classify import ClassifierI

class BaseClassifier(ClassifierI):
    def train_model(self):
        raise NotImplementedError("Class {} doesn't implement train_model()".format(self.__class__.__name__))

    def test_model(self):
        raise NotImplementedError("Class {} doesn't implement test_model()".format(self.__class__.__name__))

    def __repr__(self):
        trained = True if hasattr(self, 'CLF') else False
        return '<{} trained={}>'.format(self.__class__.__name__, trained)
