import os

POSTGRES_URI = os.getenv('POSTGRES_URI') or None
NLP_SERVICE_URL = os.getenv('NLP_SERVICE_URL') or None

if not NLP_SERVICE_URL and os.getenv('MEALPREP_NLP_SERVICE_HOST') and os.getenv('MEALPREP_NLP_SERVICE_PORT'):
    NLP_SERVICE_URL = 'http://{}:{}'.format(os.getenv('MEALPREP_NLP_SERVICE_HOST'), os.getenv('MEALPREP_NLP_SERVICE_PORT'))

# Necessary Config Variables
if not POSTGRES_URI or not 'mealprep' in POSTGRES_URI:
    raise Exception('Need to provide a POSTGRES_URI to a database named "mealprep".')

if not NLP_SERVICE_URL:
    raise Exception('Need to provide NLP_SERVICE_URL.')


print('POSTGRES_URI:', POSTGRES_URI)
print('NLP_SERVICE_URL:', NLP_SERVICE_URL)
