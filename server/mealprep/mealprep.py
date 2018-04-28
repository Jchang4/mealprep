from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={'*': {'origins': 'http://localhost:3000'}}) # required for frontend

# Set App Config
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
