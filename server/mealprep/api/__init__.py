from flask_restful import Api
from mealprep.mealprep import app

api = Api(app)

# Api Endpoints
from mealprep.api.profile import ProfileManyAPI, ProfileOneAPI
from mealprep.api.nlp_ingredient import NLPIngredientAPI
from mealprep.api.recipe import SearchRecipeAPI, RecipeAPI

# Initialize Endpoints
api.add_resource(ProfileManyAPI, '/profiles')
api.add_resource(ProfileOneAPI, '/profile/<int:profile_id>')

api.add_resource(NLPIngredientAPI, '/nlp')

api.add_resource(SearchRecipeAPI, '/recipe')
api.add_resource(RecipeAPI, '/recipe/<string:recipe_id>')
