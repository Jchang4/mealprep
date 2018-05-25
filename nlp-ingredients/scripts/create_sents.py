"""
Change NYT and my data to sents
"""
import os, sys
sys.path.append(os.path.join(os.path.dirname(__file__), '../'))
from training.sents import nyt_to_sents, my_data_to_sents, create_mini_df
from training.helpers import save_pickle

sents = nyt_to_sents()
save_pickle(sents, './data/nyt_sents.pickle')
print('Saved NYT pickle! Woo!')

# sents = my_data_to_sents()
# save_pickle(sents, './data/my_sents.pickle')

create_mini_df()
print('Created mini df. Woo!')
