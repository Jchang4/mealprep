from flask import Flask, jsonify

app = Flask(__name__)

from mealprep.models import db
from mealprep.api import api

@app.route('/')
def index():
    return jsonify({
        'status': 200,
        'message': 'Welcome to the MealPrep API!',
    })
