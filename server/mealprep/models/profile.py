from mealprep.models.database import db
from mealprep.models.helpers import table_to_dict

class Profile(db.Model):
    __tablename__ = 'profile'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(128), nullable=False)
    last_name = db.Column(db.String(128))
    email = db.Column(db.String(120), nullable=False)

    def __init__(self, first_name, email):
        self.first_name = first_name
        self.email = email

    def to_dict(self):
        return table_to_dict(self)
