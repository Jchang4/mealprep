from flask_restful import Api

# Api Endpoints
from .routes.nlp_ingredient import AddNlpIngredientAPI, ClassifyIngredientApi
from .routes.recipe import GetRecipesApi, GetRecipeByIdApi
from .routes.combine_ingredients import CombineIngredientsApi

def create_api(app):
    api = Api(app)

    api.add_resource(AddNlpIngredientAPI, '/nlp')
    api.add_resource(ClassifyIngredientApi, '/nlp/classify')

    api.add_resource(GetRecipesApi, '/recipe')
    api.add_resource(GetRecipeByIdApi, '/recipe/<string:recipe_id>')

    api.add_resource(CombineIngredientsApi, '/grocery')

    return api
