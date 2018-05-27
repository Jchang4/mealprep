from flask import request
from flask_restful import Resource
from mealprep.mealprep import app
from ..helpers.responses import GenericSuccessResponse, CreatedNewItemResponse, BadRequestResponse, ServerErrorResponse
from ..helpers.ingredients import save_new_ingredient, already_classified_ingredient, classify_all_ingredients
from ..helpers.general import can_be_float


class NLPIngredientApi(Resource):
    """ Save new classified ingredient to database """
    def post(self):
        req_data = request.get_json(force=True, silent=True) or {}

        if self.has_required_data(req_data):
            try:
                already_classified_ingredient = already_classified_ingredient(req_data['original'], req_data['name'])
                if already_classified_ingredient and not req_data.get('force'):
                    return BadRequestResponse("Ingredient has already been classified! If you want to save this again, use 'force'.")

                new_ingredient = save_new_ingredient(req_data['original'],
                                                     req_data['name'],
                                                     req_data.get('quantity'),
                                                     req_data.get('unit'),
                                                     req_data.get('comment'))

                return CreatedNewItemResponse(data=new_ingredient.to_dict())

            except Exception as e:
                app.logger.error(repr(e))
                return ServerErrorResponse('Server Error. Postgres failed to add new nlp ingredient.')

        else:
            return BadRequestResponse('Missing required parameters or bad parameters.')


    def has_required_data(self, data):
        """ Requirements:
                (required) original
                (required) name
                (optional) quantity : must be a float
        """
        if not data.get('original') or not data.get('name'):
            return False
        if data.get('quantity') and not can_be_float(data['quantity']):
            return False
        return True


class ClassifyIngredientApi(Resource):
    """ Classify all ingredients

        :param ingredients list<str> : list of ingredients to classify

        Returns: list<dict> : list of classified ingredients
    """
    def post(self):
        data = request.get_json(force=True, silent=True) or {}
        if data.get('ingredients'):
            try:
                ingr = classify_all_ingredients(data['ingredients'])
                return GenericSuccessResponse(ingredients=ingr)
            except Exception as e:
                app.logger.error(repr(e))
                return ServerErrorResponse('Something went wrong when trying to classify ingredients')
        else:
            return BadRequestResponse('Missing parameters: ingredients')
