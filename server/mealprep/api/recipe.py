import mealprep.food_services.food2fork as Food2Fork
from flask import request, jsonify
from flask_restful import Resource

class GetRecipesApi(Resource):
    def post(self):
        data = request.get_json(force=True, silent=True) or {}
        query = data.get('query')
        sort = data.get('sort')
        page = data.get('page')

        if query:
            recipes = Food2Fork.search(query, sort=sort, page=page)
            recipes['recipes'].sort(key=lambda r: r['social_rank'], reverse=True) # Descending
            return jsonify({
                'status': 200,
                'count': recipes['count'],
                'data': recipes['recipes'],
            })
        else:
            return jsonify({
                'status': 400,
                'error': 'Bad request. Check your query.',
            })


class GetRecipeByIdApi(Resource):
    def get(self, recipe_id):
        r = Food2Fork.get_recipe(recipe_id)
        if r:
            return jsonify({
                'status': 200,
                'data': r['recipe'],
            })

        return jsonify({
            'status': 400,
            'error': 'Could not find ',
        })




def has_required_data_search(data):
    if data.get('query'):
        return True
    return False
