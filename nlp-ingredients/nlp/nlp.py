from flask import Flask, jsonify, request
from flask_cors import CORS

from api import classify_ingredient_app

app = Flask(__name__)
app.register_blueprint(classify_ingredient_app)
# TODO: frontend + api in origins
cors = CORS(app, resources={'*': {'origins': '*'}})


@app.route("/")
def index():
    return jsonify({
        'status': 200,
        'data': 'Welcome to NLP Ingredients! :)',
    })
