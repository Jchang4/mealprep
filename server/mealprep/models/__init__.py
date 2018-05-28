from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_db(app):
    db.init_app(app)
    return db


# Models
from .nlp_ingredient import NLPIngredient
