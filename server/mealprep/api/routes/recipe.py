from flask import current_app
from flask_restful import Resource, reqparse
import mealprep.food_services.food2fork as Food2Fork
from ..helpers.responses import GenericSuccessResponse, BadRequestResponse, NotFoundResponse, ServerErrorResponse

parser = reqparse.RequestParser(trim=True)
parser.add_argument('query',
                    type=str,
                    required=True,
                    help="List of ingredients, used to find recipes.")
parser.add_argument('sort', type=str, help="Must be either letter: 'r' or 't'; for 'rating' and 'trending' respectively.")
parser.add_argument('page', type=int, help="Must be an integer.")

class GetRecipesApi(Resource):
    """ Get food2fork recipes """
    def post(self):
        args = parser.parse_args()
        query = args['query']
        page = args['page'] or '1'
        sort = 'r'
        if query:
            try:
                recipes = Food2Fork.search(query, sort=sort, page=page)
                recipes['recipes'].sort(key=lambda r: r['social_rank'], reverse=True) # Descending
                return GenericSuccessResponse(count=recipes['count'], data=recipes['recipes'])
            except Exception as e:
                current_app.logger.error(repr(e))
                return ServerErrorResponse(e, 'May day, may day! Food2Fork is down!')
        else:
            return BadRequestResponse('Check your query.')


class GetRecipeByIdApi(Resource):
    """ Get food2fork recipe details by id
        Includes additional information such as ingredients
    """
    def get(self, recipe_id):
        try:
            r = Food2Fork.get_recipe(recipe_id)
            if r:
                return GenericSuccessResponse(data=r)
            return NotFoundResponse('Could not find recipe with id: {}'.format(recipe_id))
        except Exception as e:
            current_app.logger.error(repr(e))
            return ServerErrorResponse('May day, may day! Food2Fork is down!')
