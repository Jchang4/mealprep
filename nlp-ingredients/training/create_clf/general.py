import nltk
from nltk.classify.scikitlearn import SklearnClassifier
from sklearn.linear_model import LogisticRegression, SGDClassifier
from sklearn.svm import LinearSVC
from training.helpers import save_pickle

def create_logistic(trainset, testset):
    LogisticRegression_classifier = SklearnClassifier(LogisticRegression())
    LogisticRegression_classifier.train(trainset)
    print("LogisticRegression_classifier accuracy percent test sents:", (nltk.classify.accuracy(LogisticRegression_classifier, testset))*100)
    # print("LogisticRegression_classifier accuracy percent my sents:", (nltk.classify.accuracy(LogisticRegression_classifier, feature_my))*100)
    save_pickle(LogisticRegression_classifier, './classifiers/logistic_regression.pickle')

def create_sgd(trainset, testset):
    SGDClassifier_classifier = SklearnClassifier(SGDClassifier())
    SGDClassifier_classifier.train(trainset)
    print("SGDClassifier_classifier accuracy percent test sents:", (nltk.classify.accuracy(SGDClassifier_classifier, testset))*100)
    # print("SGDClassifier_classifier accuracy percent my sents:", (nltk.classify.accuracy(SGDClassifier_classifier, feature_my))*100)
    save_pickle(SGDClassifier_classifier, './classifiers/stochastic_gradient_descent.pickle')

def create_linearSVC(trainset, testset):
    LinearSVC_classifier = SklearnClassifier(LinearSVC())
    LinearSVC_classifier.train(trainset)
    print("LinearSVC_classifier accuracy percent test sents:", (nltk.classify.accuracy(LinearSVC_classifier, testset))*100)
    # print("LinearSVC_classifier accuracy percent my sents:", (nltk.classify.accuracy(LinearSVC_classifier, feature_my))*100)
    save_pickle(LinearSVC_classifier, './classifiers/linear_svc.pickle')
