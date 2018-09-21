from .logger import server_log
from mealprep.models import db, NLPIngredient
from uuid import uuid4

def new_uuid():
    return str(uuid4())

def add_nlp_ingredient(original, name, quantity=None, unit=None, comment=None):
    new_nlp = NLPIngredient(original=original,
                            name=name,
                            quantity=quantity,
                            unit=unit,
                            comment=comment)
    db.session.add(new_nlp)
    db.session.commit()
    return new_nlp

def get_all_nlp_ingredients():
    return NLPIngredient.query.all()
