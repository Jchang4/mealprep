from . import client
import logging
import json

def test_nlp_ingred(client):
    a = client.get('/')
    data = json.loads(a.data.decode('utf-8'))
    print('working?')
    assert data['message'] == 'Welcome to the MealPrep API!'
