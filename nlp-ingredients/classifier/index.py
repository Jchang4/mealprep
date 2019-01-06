"""
Train the classifier and save as pickle
"""
import pickle
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction import DictVectorizer
from sklearn.externals import joblib

# CSV to Features
sents = pd.read_pickle('./data/processed-my-ingredients.pickle')
def sents_to_features(sents):
    features = []
    labels = []
    for token in sents:
        num_words = len(token['lemma'])
        for i in range(num_words):
            features.append({
                # Current Word
                'word': token['lemma'][i],
                'tag': token['tag'][i],
                # Prev Word
                'prev_word': token['lemma'][i-1] if i-1 >= 0 else '',
                'prev_tag': token['tag'][i-1] if i-1 >= 0 else '',
                # Prev Prev Word
                'prev_prev_word': token['lemma'][i-2] if i-2 >= 0 else '',
                'prev_prev_tag': token['tag'][i-2] if i-2 >= 0 else '',
                # Next Word
                'next_word': token['lemma'][i+1] if i+1 < num_words else '',
                'next_tag': token['tag'][i+1] if i+1 < num_words else '',
                # Next Next
                'next_next_word': token['lemma'][i+2] if i+2 < num_words else '',
                'next_next_tag': token['tag'][i+2] if i+2 < num_words else '',
            })
            labels.append(token['label'][i])
    return features, labels

features, labels = sents_to_features(sents)
X_train, X_test, y_train, y_test = train_test_split(features, labels, 
                                                    train_size=0.88, 
                                                    shuffle=False)

# Train Classifier
clf_lr = Pipeline([
    ('vectorizer', DictVectorizer(sparse=False)),
    ('log_reg', LogisticRegression())
])
clf_lr.fit(X_train, y_train)
print('Logistic Regression Score:', clf_lr.score(X_test, y_test))

# Save to Pickle
filename = './data/logistic-regression-93.2.pickle'
joblib.dump(clf_lr, filename)