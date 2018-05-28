from .database import db
from .base import BaseModel

class NLPIngredient(BaseModel, db.Model):
    __tablename__ = 'nlp_ingredient'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    original = db.Column(db.Text, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    quantity = db.Column(db.Float)
    unit = db.Column(db.String(50))
    comment = db.Column(db.Text)

    def __repr__(self):
        return '<Ingredient id:{} name:{}>'.format(self.id, self.name)
