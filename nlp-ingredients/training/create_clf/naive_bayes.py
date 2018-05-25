import nltk
from nltk.classify.scikitlearn import SklearnClassifier
from training.clf.naive_bayes import NaiveBayesCLF
from sklearn.naive_bayes import MultinomialNB, BernoulliNB
from training.helpers import save_pickle

def create_NB(trainset, testset):
    NaiveBayes_classifier = NaiveBayesCLF()
    NaiveBayes_classifier.train_model(trainset)
    results = NaiveBayes_classifier.test_model(testset)
    print('Naive Bayes Score test sents:', results*100)
    # results = NaiveBayes_classifier.test_model(feature_my)
    # print('Naive Bayes Score my sents:', results*100)
    print(NaiveBayes_classifier.most_informative_features(30))
    save_pickle(NaiveBayes_classifier, './classifiers/naive_bayes.pickle')


def create_multiNB(trainset, testset):
    MultinomialNB_classifier = SklearnClassifier(MultinomialNB())
    MultinomialNB_classifier.train(trainset)
    print("MultinomialNB accuracy percent test sents:",nltk.classify.accuracy(MultinomialNB_classifier, testset)*100)
    # print("MultinomialNB accuracy percent my sents:",nltk.classify.accuracy(MultinomialNB_classifier, feature_my)*100)
    save_pickle(MultinomialNB_classifier, './classifiers/multinomial_naive_bayes.pickle')


def create_bernoulliNB(trainset, testset):
    BernoulliNB_classifier = SklearnClassifier(BernoulliNB())
    BernoulliNB_classifier.train(trainset)
    print("BernoulliNB accuracy percent test sents:",nltk.classify.accuracy(BernoulliNB_classifier, testset)*100)
    # print("BernoulliNB accuracy percent my sents:",nltk.classify.accuracy(BernoulliNB_classifier, feature_my)*100)
    save_pickle(BernoulliNB_classifier, './classifiers/bernoulli_naive_bayes.pickle')
