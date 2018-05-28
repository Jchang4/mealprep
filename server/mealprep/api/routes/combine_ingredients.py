from flask import current_app
from flask_restful import Resource
import mealprep.food_services.food2fork as F2F
from ..helpers.ingredients import classify_all_ingredients, combine_ingredients
from ..helpers.responses import GenericSuccessResponse, BadRequestResponse, ServerErrorResponse


def get_all_ingredients(recipe_ids):
    """ Return a single list of all ingredients for all recipes. """
    ingredients = []
    for rId in recipe_ids:
        r = F2F.get_recipe(rId)
        if r and r.get('ingredients'):
            ingredients += r['ingredients']
    return [i.strip() for i in ingredients]


class CombineIngredientsApi(Resource):
    """ Take a list of recipe ids, and combine their
        ingredients into a single grocery list by
        combining like ingredients, and putting
        the original lines & comments into an array

        Example:
            RequestBody: { recipes: [id1, id2 ... ] }
            Response: {
                ingredients: [
                    {
                        name: String,
                        quantity: Number,
                        comments: Array<String>,
                        originals: Array<String>,
                    }
                ]
            }
    """
    def post(self):
        """ Get recipes by id and combine like ingredients """
        data = request.get_json(force=True, silent=True) or {}
        recipe_ids = data.get('recipeIds') or []

        if recipe_ids and len(recipe_ids) > 0:
            try:
                ingredients = get_all_ingredients(recipe_ids)
                combined_ingredients = combine_ingredients(ingredients)
                return GenericSuccessResponse(ingredients=combined_ingredients)
            except Exception as e:
                current_app.logger.error(repr(e))
                return ServerErrorResponse('Server Error: Cannot combine ingredients.')
        else:
            return BadRequestResponse('You did not supply any recipe ids.')
