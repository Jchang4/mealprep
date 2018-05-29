from flask import current_app, request
from flask_restful import Resource, reqparse
from mealprep.models import db, NLPIngredient
from ..helpers.responses import GenericSuccessResponse, CreatedNewItemResponse, BadRequestResponse, ServerErrorResponse

# from ..helpers.ingredients import save_new_ingredient, already_classified_ingredient, classify_all_ingredients
from ..helpers.general import can_be_float

parser = reqparse.RequestParser(trim=True)
parser.add_argument('original', type=str, required=True, help="Must include original ingredient text.")
parser.add_argument('name', type=str, required=True, help="Must include ingredient name.")
parser.add_argument('quantity', type=float, help="Must be a float.")
parser.add_argument('unit', type=str, help="Must be a string.")
parser.add_argument('comment', type=str, help="Parts of the ingredient that are comments - i.e. 'diced'.")
parser.add_argument('force', type=bool, help="True/False whether to force add ingredient to database.")


class AddNlpIngredientAPI(Resource):
    """ Save new user-classified ingredient to database """
    def post(self):
        args = parser.parse_args()
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
            # Add new ingredient
            new_ingr = NLPIngredient(original=original,
                                     name=name,
                                     quantity=quantity,
                                     unit=unit,
                                     comment=comment)
            db.session.add(new_ingr)
            db.session.commit()
            return CreatedNewItemResponse(ingredient=new_ingr)
        except Exception as e:
            current_app.logger.error(repr(e))
            return ServerErrorResponse(e, 'Server Down: Unable to add new classified ingredients.')



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
                current_app.logger.error(repr(e))
                return ServerErrorResponse(e, 'Something went wrong when trying to classify ingredients')
        else:
            return BadRequestResponse('Missing parameters: ingredients')
