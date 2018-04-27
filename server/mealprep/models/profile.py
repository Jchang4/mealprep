from mealprep.models.libs.BaseTable import BaseTable

class Profile(BaseTable):
    __tablename__ = 'profile'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(128))
    last_name = db.Column(db.String(128))
    brand_new = db.Column(db.String(25))

    def __init__(self, first_name, brand_new):
        self.first_name = first_name
        self.brand_new = brand_new

    # def to_dict(self):
    #     return {
    #         'id': self.id,
    #         'first_name': self.first_name,
    #         'last_name': self.last_name,
    #         'brand_new': self.brand_new,
    #     }
