import nltk
from training.clf.vote import VoteClassifier
from training.helpers import save_pickle, load_pickle

def create_vote(testset):
    try:
        # Classifiers
        LogisticRegression_classifier = load_pickle('./classifiers/logistic_regression.pickle')
        LinearSVC_classifier = load_pickle('./classifiers/linear_svc.pickle')
        SGDClassifier_classifier = load_pickle('./classifiers/stochastic_gradient_descent.pickle')
        NaiveBayes_classifier = load_pickle('./classifiers/naive_bayes.pickle')
        MultinomialNB_classifier = load_pickle('./classifiers/multinomial_naive_bayes.pickle')
        BernoulliNB_classifier = load_pickle('./classifiers/bernoulli_naive_bayes.pickle')
    except Exception as e:
        print(e)
        raise ValueException('Could not load neccessary classifiers.')

    Vote_classifier = VoteClassifier(
                            LogisticRegression_classifier,
                            LinearSVC_classifier,
                            SGDClassifier_classifier,
                            NaiveBayes_classifier,
                            MultinomialNB_classifier,
                            BernoulliNB_classifier,
                            default_classifier=LogisticRegression_classifier)
    save_pickle(Vote_classifier, './classifiers/vote.pickle')
    # print("VoteClassifier accuracy percent test sents:", (nltk.classify.accuracy(Vote_classifier, testset))*100)

# try:
#     vote_classifier = VoteClassifier(LogisticRegression_classifier,
#                                     SGDClassifier_classifier,
#                                     LinearSVC_classifier)
#     print("VoteClassifier accuracy percent test sents:", (nltk.classify.accuracy(vote_classifier, feature_test))*100)
#     # print("VoteClassifier accuracy percent my sents:", (nltk.classify.accuracy(vote_classifier, feature_my))*100)
# except Exception as e:
#     print(e)
