from flask_restful import Api
from mealprep.mealprep import app

api = Api(app)

# Api Endpoints
from mealprep.api.profile import ProfileManyAPI, ProfileOneAPI
from mealprep.api.nlp_ingredient import NLPIngredientAPI

# Initialize Endpoints
api.add_resource(ProfileManyAPI, '/profiles')
api.add_resource(ProfileOneAPI, '/profile/<int:profile_id>')
api.add_resource(NLPIngredientAPI, '/nlp')
