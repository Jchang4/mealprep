from flask import request, current_app
from flask_restful import Resource, reqparse
from mealprep.models import db, NLPIngredient
from ..helpers.responses import GenericSuccessResponse, CreatedNewItemResponse, BadRequestResponse, ServerErrorResponse
from ..helpers.general import can_be_float
from ..argparsers import nlp_ingredient_args, classify_ingredient_args
from ..nlp_ingred_manager import add_nlp_ingredient
from ..logger import server_log

class AddNlpIngredientAPI(Resource):
    parser = nlp_ingredient_args()

    """ Save new user-classified ingredient to database """
    def post(self):
        args = self.parser.parse_args()
        original = args['original']
        name = args['name']
        quantity = args['quantity'] or None
        unit = args['unit'] or None
        comment = args['comment'] or None
        force = args['force'] or False

        if not force:
            # Check if ingredient already exists
            # Return Error if already taken
            ingr = NLPIngredient.query.filter_by(original=original, name=name).first()
            if ingr:
                return BadRequestResponse("Ingredient has already been classified! If you want to save this again, use 'force'.")

        try:
            current_app.logger.info('Adding new NLP Ingredient...')
            # Add new ingredient
            new_ingr = NLPIngredient(original=original,
                                     name=name,
                                     quantity=quantity,
                                     unit=unit,
                                     comment=comment)
            db.session.add(new_ingr)
            db.session.commit()
            current_app.logger.info('Added new NLP Ingredient id={}'.format(new_ingr.id))
            return CreatedNewItemResponse(ingredient=new_ingr.to_dict())
        except Exception as e:
            current_app.logger.error(repr(e))
            return ServerErrorResponse(e, 'Server Down: Unable to add new classified ingredients.')



class ClassifyIngredientApi(Resource):
    parser = classify_ingredient_args()

    """ Classify all ingredients

        :param ingredients list<str> : list of ingredients to classify

        Returns: list<dict> : list of classified ingredients
    """
    def post(self):
        args = self.parser.parse_args()
        ingredients = args['ingredients']
        try:
            ingr = classify_all_ingredients(ingredients)
            return GenericSuccessResponse(ingredients=ingr)
        except Exception as e:
            current_app.logger.error(repr(e))
            return ServerErrorResponse(e, 'Something went wrong when trying to classify ingredients')
