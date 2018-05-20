from flask_restful import Resource
from mealprep.mealprep import app
import mealprep.food_services.food2fork as Food2Fork
from .helpers.responses import GenericSuccessResponse, BadRequest, NotFound, ServerError

class GetRecipesApi(Resource):
    def post(self):
        data = request.get_json(force=True, silent=True) or {}
        query = data.get('query')
        sort = data.get('sort') or 'r'
        page = data.get('page') or '1'
        if query:
            try:
                recipes = Food2Fork.search(query, sort=sort, page=page)
                recipes['recipes'].sort(key=lambda r: r['social_rank'], reverse=True) # Descending
                return GenericSuccessResponse(count=recipes['count'], data=recipes['recipes'])
            except Exception as e:
                app.logger.error(repr(e))
                return ServerError('May day, may day! Food2Fork is down!')
        else:
            return BadRequest('Check your query.')


class GetRecipeByIdApi(Resource):
    def get(self, recipe_id):
        try:
            r = Food2Fork.get_recipe(recipe_id)
            if r:
                return GenericSuccessResponse(data=r)
            return NotFound('Could not find recipe with id: {}'.format(recipe_id))
        except Exception as e:
            app.logger.error(repr(e))
            return ServerError('May day, may day! Food2Fork is down!')
