import requests
from config.env import NLP_SERVICE_URL


def classify_all_ingredients(ingredients):
    """ Take a list of ingredients and
        classify them.

        Example:
            ingredients = [
                '1 chicken breast',
                '4 cloves of garlic, minced',
                '2 heads of broccoli',
            ]
            Response: {
                status: 200,
                data: [
                    {
                        original: '1 chicken breast',
                        name: 'chicken breast',
                        quantity: 1,
                    },
                    {
                        original: '4 cloves of garlic, minced',
                        name: 'garlic',
                        quantity: 4,
                        unit: 'clove',
                        comment: 'minced',
                        other: 'of'
                    },
                    {
                        original: '2 heads of broccoli',
                        name: 'broccoli',
                        quantity: 2,
                        unit: head,
                        other: 'of'
                    }
                ]
            }
    """
    r = requests.post(NLP_SERVICE_URL, json={'ingredients': ingredients})
    r = r.json().get('data')
    return r
