import requests
from config.env import NLP_SERVICE_URL
from mealprep.mealprep import app
from mealprep.models import db, NLPIngredient

def save_new_ingredient(original, name, quantity, unit, comment):
    """ Create new classified ingredient and save to database """
    new_ingredient = NLPIngredient(original=original,
                                   name=name,
                                   quantity=quantity,
                                   unit=unit,
                                   comment=comment)
    db.session.add(new_ingredient)
    db.session.commit()
    # Log some info
    app.logger.info('Created New NLP Ingredient!')
    return new_ingredient

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
    r = (r.json() or {}).get('data')
    return r

def combine_ingredients(ingredients):
    """ Turn a list of ingredients into combined, classified ingredients """
    url = NLP_SERVICE_URL + '/combine'
    r = requests.post(url, json={'ingredients': ingredients})
    r = (r.json() or {}).get('ingredients')
    return r


def already_classified_ingredient(original, name):
    """ Check if ingredient has already been classified
            via 'original' and 'name'
    """
    ingr = NLPIngredient.query.filter_by(original=original, name=name).first()
    if ingr:
        return True
    else:
        return False
