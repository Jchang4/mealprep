"""
    Naive Bayes Score test sents: 85.88843157762795
    Naive Bayes Score my sents: 84.65927099841521

    MultinomialNB accuracy percent test sents: 85.75834186953773
    MultinomialNB accuracy percent my sents: 85.51505546751189

    BernoulliNB accuracy percent test sents: 85.94359566724059
    BernoulliNB accuracy percent my sents: 85.76862123613313

    LogisticRegression_classifier accuracy percent test sents: 90.5814789791426
    LogisticRegression_classifier accuracy percent my sents: 86.2123613312203

    SGDClassifier_classifier accuracy percent test sents: 90.30686746725367
    SGDClassifier_classifier accuracy percent my sents: 86.59270998415214

    LinearSVC_classifier accuracy percent test sents: 90.60872218468714
    LinearSVC_classifier accuracy percent my sents: 85.41996830427892
"""
import os, sys
sys.path.append(os.path.join(os.path.dirname(__file__), '../'))
import pandas as pd
import numpy as np
from training.sents import sents_to_features

sents = pd.read_pickle('./data/nyt_sents.pickle')
# my_sents = pd.read_pickle('./data/my_sents.pickle')

np.random.shuffle(sents)
# np.random.shuffle(my_sents)

# sents = sents[0:20000] # use first 20,000
size = int(len(sents) * 0.85)
train_sents = sents[:size]
test_sents = sents[size:]


feature_train = [(f,l)
    for sent in sents_to_features(train_sents)
        for (f,l) in sent]
feature_test = [(f,l)
    for sent in sents_to_features(test_sents)
        for (f,l) in sent]
# feature_my = [(f,l)
#     for sent in sents_to_features(my_sents)
#         for (f,l) in sent]


from training.create_clf import *

create_NB(feature_train, feature_test)
create_multiNB(feature_train, feature_test)
create_bernoulliNB(feature_train, feature_test)
create_logistic(feature_train, feature_test)
create_sgd(feature_train, feature_test)
create_linearSVC(feature_train, feature_test)
create_vote(feature_test)
