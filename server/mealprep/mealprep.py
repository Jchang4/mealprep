from flask import Flask, jsonify

app = Flask(__name__)

# from mealprep.models.database import db, Profile
# from pprint import pprint

@app.route('/')
def index():
    # data = [f.to_dict() for f in Profile.query.all()]
    return jsonify({
        'message': 'success',
        # 'data': data,
    })

# print()
# data = [f.to_dict() for f in Profile.query.all()]
# pprint(data)
# print()


# new_flaskr = Profile('Justin', 'This is my LOCAL test')
# db.session.add(new_flaskr)
# db.session.commit()
