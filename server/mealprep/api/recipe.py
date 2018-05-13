import mealprep.food_services.food2fork as Food2Fork
from flask import request, jsonify
from flask_restful import Resource

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
                return jsonify({
                    'status': 200,
                    'count': recipes['count'],
                    'data': recipes['recipes'],
                })
            except:
                return jsonify({
                    'status': 500,
                    'error': 'May day, may day! Food2Fork is down!',
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
