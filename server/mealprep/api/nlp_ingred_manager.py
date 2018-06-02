from .logger import server_log
from mealprep.models import db, NLPIngredient
from uuid import uuid4

def new_uuid():
    return str(uuid4())

def add_nlp_ingredient(original, name, quantity=None, unit=None, comment=None):
    task_id = new_uuid()
    server_log('Adding NLP Ingredient id={}...'.format(task_id))
    try:
        new_nlp = NLPIngredient(original=original,
                                name=name,
                                quantity=quantity,
                                unit=unit,
                                comment=comment)
        db.session.add(new_nlp)
        db.session.commit()
        server_log('Added new NLP Ingredient id={}'.format(task_id))
        return new_nlp
    except Exception as e:
        server_log(repr(e), type='error')
        server_log('Failed to add NLP Ingredient id={}'.format(task_id), type='error')

def get_all_nlp_ingredients():
    return NLPIngredient.query.all()
