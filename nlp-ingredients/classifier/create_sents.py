"""
Change NYT and my data to sents
"""
import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), '../'))

from training.helpers import save_pickle
from training.sents import nyt_to_sents, my_data_to_sents, create_mini_df

sents = nyt_to_sents()
save_pickle(sents, './data/nyt_sents.pickle')
print('Saved NYT pickle! Woo!')

sents = my_data_to_sents('./data/my-ingredients.pickle')
save_pickle(sents, './data/my_sents.pickle')
print('Saved my pickle! Woo!')

create_mini_df()
print('Created mini df. Woo!')
