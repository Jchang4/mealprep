from flask_restful import Api
from mealprep.mealprep import app

api = Api(app)

# Api Endpoints
from .profile import ProfileManyAPI, ProfileOneAPI
from .nlp_ingredient import NLPIngredientAPI, ClassifyIngredientAPI
from .recipe import SearchRecipeAPI, RecipeAPI
from .combine_ingredients import CombineIngredientsAPI

# Initialize Endpoints
api.add_resource(ProfileManyAPI, '/profiles')
api.add_resource(ProfileOneAPI, '/profile/<int:profile_id>')

api.add_resource(NLPIngredientAPI, '/nlp')
api.add_resource(ClassifyIngredientAPI, '/nlp/classify')

api.add_resource(SearchRecipeAPI, '/recipe')
api.add_resource(RecipeAPI, '/recipe/<string:recipe_id>')

api.add_resource(CombineIngredientsAPI, '/grocery')
