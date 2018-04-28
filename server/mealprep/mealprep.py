from flask import Flask, jsonify

app = Flask(__name__)
app.config.from_object('config.app.DevelopmentConfig')
# app.config.from_object('config.app.ProductionConfig')

from mealprep.models import db
from mealprep.api import api

@app.route('/')
def index():
    return jsonify({
        'status': 200,
        'message': 'Welcome to the MealPrep API!',
    })
