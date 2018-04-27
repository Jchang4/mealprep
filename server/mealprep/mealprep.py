from flask import Flask, jsonify

app = Flask(__name__)

from mealprep.models import db
from mealprep.api import api

@app.route('/')
def index():
    # data = [f.to_dict() for f in Profile.query.all()]
    return jsonify({
        'status': 200,
        'message': 'Welcome to the MealPrep API!',
    })
