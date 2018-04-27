""" Take a list of recipe ids, and combine their
    ingredients into a single grocery list by
    combining like ingredients, and putting
    the original lines & comments into an array

    Example:
        RequestBody: { recipes: [id1, id2 ... idN] }
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
from flask import request, jsonify
from flask_restful import Resource
import requests
import mealprep.food_services.food2fork as F2F
from mealprep.api.helpers import classify_all_ingredients
from mealprep.unitconverter import convert_unit

class CombineIngredientsAPI(Resource):
    def post(self):
        """ Get recipes by id and combine like ingredients """
        data = request.get_json(silent=True) or {}
        recipe_ids = data.get('recipeIds') or []

        if recipe_ids and len(recipe_ids) > 0:
            ingredients = self.get_all_ingredients(recipe_ids)
            classified_ingredients = classify_all_ingredients(ingredients)
            combined_ingredients = self.combine_classified_ingredients(classified_ingredients)
            return jsonify({
                'status': 200,
                'ingredients': combined_ingredients,
            })

        return jsonify({
            'status': 400,
            'error': 'Bad Request. You did not supply any recipe ids.',
        })

    def get_all_ingredients(self, recipe_ids):
        """ Get recipes by id and grab their ingredients.
            Return a single list of all ingredients for all recipes.
        """
        ingredients = []

        for rId in recipe_ids:
            r = F2F.get_recipe(rId)
            if r.get('recipe').get('ingredients'):
                ingredients += r['recipe']['ingredients']

        for idx,ingr in enumerate(ingredients):
            ingredients[idx] = ingr.strip()

        return ingredients

    def combine_classified_ingredients(self, classified_ingredients):
        """ Combine classified ingredients and add quantities """
        seen_ingr = {}
        combined_ingredients = []

        for c in classified_ingredients:
            name = c['name']
            if not name in seen_ingr:
                seen_ingr[name] = {}
                # These become lists
                seen_ingr[name]['originals'] = [c['original']]
                seen_ingr[name]['comments'] = [c['comment']]
                seen_ingr[name]['others'] = [c['other']]
                # Other props
                seen_ingr[name]['name'] = c['name']
                seen_ingr[name]['unit'] = c['unit']
                seen_ingr[name]['quantity'] = c['quantity']
            else:
                prev_qty = seen_ingr[name]['quantity']

                if c['original'] not in seen_ingr[name]['originals']:
                    seen_ingr[name]['originals'].append(c['original'])
                    seen_ingr[name]['comments'].append(c['comment'])
                    seen_ingr[name]['others'].append(c['other'])

                # Make sure units match, and add quantities
                if seen_ingr[name]['unit'] == c['unit'] and prev_qty:
                    seen_ingr[name]['quantity'] = float(prev_qty) + float(c['quantity'])
                elif prev_qty:
                    new_qty = convert_unit(float(c['quantity']),
                                                c['unit'],
                                                seen_ingr[name]['unit'])
                    seen_ingr[name]['quantity'] = float(prev_qty) + new_qty

        for key,val in seen_ingr.items():
            combined_ingredients.append(val)

        return combined_ingredients
