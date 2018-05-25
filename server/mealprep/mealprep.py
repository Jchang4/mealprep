from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={'*': {'origins': 'http://10.0.2.2:3000'}}) # required for frontend

# Set App Config
app.config.from_object('config.app.DevelopmentConfig')

from .models import db
from .api import api

from .api.helpers.responses import GenericSuccessResponse
@app.route('/')
def index():
    return GenericSuccessResponse(message='Welcome to the MealPrep API!')
