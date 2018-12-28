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
import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), '../'))

import numpy as np
import pandas as pd

from training.create_clf import (create_bernoulliNB, create_linearSVC,
                                 create_logistic, create_multiNB, create_NB,
                                 create_sgd, create_vote)
from training.sents import sents_to_features

sents = pd.read_pickle('./data/nyt_sents.pickle')
my_sents = pd.read_pickle('./data/my_sents.pickle')

all_sents = sents + my_sents
features = [(f,l)
    for sent in np.array(sents_to_features(all_sents))
        for (f,l) in sent]

# Randomize
np.random.shuffle(features)

# features = features[:200000]  # use first 20,000
train_size = int(0.75 * len(features))
train_features = features[:train_size]
test_features = features[train_size:]

train_features = [(f,l)
    for sent in np.array(sents_to_features(my_sents))
        for (f,l) in sent]
test_features = [(f,l)
    for sent in np.array(sents_to_features(sents))
        for (f,l) in sent]

create_NB(train_features, test_features)
create_multiNB(train_features, test_features)
create_bernoulliNB(train_features, test_features)
create_logistic(train_features, test_features)
create_sgd(train_features, test_features)
create_linearSVC(train_features, test_features)
create_vote(test_features)
