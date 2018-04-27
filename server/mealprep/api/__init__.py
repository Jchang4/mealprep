from flask_restful import Api
from mealprep.mealprep import app

api = Api(app)

# Api Endpoints
from mealprep.api.profile import ProfileMany, ProfileOne

# Initialize Endpoints
api.add_resource(ProfileMany, '/profiles')
api.add_resource(ProfileOne, '/profile/<int:profile_id>')
