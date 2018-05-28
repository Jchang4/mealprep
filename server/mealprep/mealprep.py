from flask import Flask, jsonify
from flask_cors import CORS

from .models import create_db
from .api import create_api

def create_app():
    app = Flask(__name__)
    cors = CORS(app, resources={'*': {'origins': '*'}}) # required for frontend

    # Set App Config
    app.config.from_object('config.app.DevelopmentConfig')

    db = create_db(app)
    api = create_api(app)

    from .api.helpers.responses import GenericSuccessResponse
    @app.route('/')
    def index():
        return GenericSuccessResponse(message='Welcome to the MealPrep API!')

    return app
