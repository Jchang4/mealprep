
class BaseModel:
    def to_dict(self):
        return { c.name: getattr(Table, c.name) for c in self.__table__.columns }
