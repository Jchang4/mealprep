
def table_to_dict(Table):
    return { c.name: getattr(Table, c.name) for c in Table.__table__.columns }
