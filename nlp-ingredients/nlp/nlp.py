from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={'*': {'origins': '*'}})

@app.route("/")
def index():
    return jsonify({
        'status': 200,
        'data': 'Welcome to NLP Ingredients! :)',
    })

# Get API Routes
from nlp.api import *
