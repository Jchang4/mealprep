from . import client
import logging
import json

TEST_CLASSIFIED_INGREDIENTS = [
    {
        'original': '2 teaspoons of maple syrup',
        'name': 'maple syrup',
        'unit': 'teaspoons',
        'quantity': 2,
        'comment': 'of'
    },
    {
        'original': '10 pounds of sugar',
        'name': 'sugar',
        'unit': 'pounds',
        'quantity': 10,
        'comment': 'of'
    }
]

def test_add_nlp_ingred_with_force(client):
    """ should add ingredients to db """
    for ingr in TEST_CLASSIFIED_INGREDIENTS:
        res = client.post('/nlp', data={**ingr, 'force': True})
        data = res.data.decode('utf-8')
        data = json.loads(data)
        # 'id' is generatd by api so must grab from response  =\
        assert data['ingredient'] == {**ingr, 'id': data['ingredient']['id']}


def test_add_nlp_ingred_without_force(client):
    """ should fail because ingredients already addded """
    for ingr in TEST_CLASSIFIED_INGREDIENTS:
        res = client.post('/nlp', data=ingr)
        assert b"Ingredient has already been classified! If you want to save this again, use 'force'." in res.data



def test_classify_ingredient(client):
    """ should return array of classified ingredients """
    res = client.post('/nlp/classify')

def test_classify_ingredient_fail(client):
    """ should return error with bad ingredients """
    pass
