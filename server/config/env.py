import os

SERVICE_HOST = os.getenv('SERVICE_HOST') or '0.0.0.0'
SERVICE_PORT = os.getenv('SERVICE_PORT') or 8080

POSTGRES_URI = os.getenv('POSTGRES_URI') or None
NLP_SERVICE_URL = os.getenv('MEALPREP_NLP_SERVICE_URL') or None

# Necessary Config Variables
if not POSTGRES_URI or not 'mealprep' in POSTGRES_URI:
    raise ValueError('Must provide POSTGRES_URI with database named "mealprep".')

if not NLP_SERVICE_URL:
    # K8s NLP service info
    k8_host = os.getenv('MEALPREP_NLP_SERVICE_HOST')
    k8_port = os.getenv('MEALPREP_NLP_SERVICE_PORT')
    if k8_host and k8_port:
        k8_url = k8_host + ':' + k8_port
        NLP_SERVICE_URL = k8_url
    else:
        raise ValueError('Must provide NLP_SERVICE_URL.')


# Helper function
def log_env():
    print('\n' + ('-' * 35))
    print('Postgres URI:   ', POSTGRES_URI)
    print('NLP Service URL:', NLP_SERVICE_URL)
    print(('-' * 35) + '\n')
