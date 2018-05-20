from flask import request
from flask_restful import Resource
from mealprep.mealprep import app
from .helpers.responses import GenericSuccessResponse, CreatedNewItemResponse, BadRequest, ServerError
from .helpers.ingredients import save_new_ingredient, already_classified_ingredient, classify_all_ingredients
from .helpers.general import can_be_float


class NLPIngredientApi(Resource):
    def post(self):
        req_data = request.get_json(force=True, silent=True) or {}

        if self.has_required_data(req_data):
            try:
                already_classified_ingredient = already_classified_ingredient(req_data['original'], req_data['name'])
                if already_classified_ingredient and not req_data.get('force'):
                    return BadRequest("Ingredient has already been classified! If you want to save this again, use 'force'.")

                new_ingredient = save_new_ingredient(req_data['original'],
                                                     req_data['name'],
                                                     req_data.get('quantity'),
                                                     req_data.get('unit'),
                                                     req_data.get('comment'))

                return CreatedNewItemResponse(data=new_ingredient.to_dict())

            except Exception as e:
                app.logger.error(repr(e))
                return ServerError('Server Error. Postgres failed to add new nlp ingredient.')

        else:
            return BadRequest('Missing required parameters or bad parameters.')


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
    def post(self):
        data = request.get_json(force=True, silent=True) or {}
        if data.get('ingredients'):
            try:
                ingr = classify_all_ingredients(data['ingredients'])
                return GenericSuccessResponse(data=ingr)
            except Exception as e:
                app.logger.error(repr(e))
                return ServerError('Something went wrong when trying to classify ingredients')
        else:
            return BadRequest('Missing parameters: ingredients')
