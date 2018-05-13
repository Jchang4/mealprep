from flask_restful import Api
from mealprep.mealprep import app

api = Api(app)

# Api Endpoints
from .nlp_ingredient import NLPIngredientApi, ClassifyIngredientApi
from .recipe import GetRecipesApi, GetRecipeByIdApi
from .combine_ingredients import CombineIngredientsApi

# Initialize Endpoints
api.add_resource(NLPIngredientApi, '/nlp')
api.add_resource(ClassifyIngredientApi, '/nlp/classify')

api.add_resource(GetRecipesApi, '/recipe')
api.add_resource(GetRecipeByIdApi, '/recipe/<string:recipe_id>')

api.add_resource(CombineIngredientsApi, '/grocery')
