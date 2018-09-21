from flask import Flask
from flask_cors import CORS

from .models import create_db
from .api import create_api

from .api.helpers.responses import GenericSuccessResponse

def create_app():
    app = Flask(__name__)
    cors = CORS(app, resources={'*': {'origins': '*'}}) # required for frontend

    # Set App Config
    app.config.from_object('config.app.DevelopmentConfig')

    db = create_db(app)
    api = create_api(app)

    @app.route('/')
    def index():
        return GenericSuccessResponse(message='Welcome to the MealPrep API!')

    return app
