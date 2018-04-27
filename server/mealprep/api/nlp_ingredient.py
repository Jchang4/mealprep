from flask import request, jsonify
from flask_restful import Resource
import requests
from mealprep.api.helpers import classify_all_ingredients
from mealprep.models import db, NLPIngredient


class NLPIngredientAPI(Resource):
    def post(self):
        data = request.get_json(force=True, silent=True) or {}

        try:
            new_ingredient = NLPIngredient(original=(data.get('original') or None),
                                        name=(data.get('name') or None),
                                        quantity=(data.get('quantity') or None),
                                        unit=(data.get('unit') or None),
                                        comment=(data.get('comment') or None))

            # Add and save to database
            db.session.add(new_ingredient)
            db.session.commit()

            return jsonify({
                'status': 200,
                'data': new_ingredient.to_dict(),
            })
        except Exception as e:
            print(e)

            if not self.has_required_data(data):
                return jsonify({
                    'status': 400,
                    'error': 'Bad request. Missing parameters.',
                })

            return jsonify({
                'status': 500,
                'error': 'Server error. Something went wrong. Cannot add nlp ingredient to database.',
            })

    @staticmethod
    def has_required_data(data):
        if data.get('original') and data.get('name'):
            return True
        return False


class ClassifyIngredientAPI(Resource):
    def post(self):
        data = request.get_json(force=True, silent=True) or {}
        if data.get('ingredients'):
            try:
                ingr = classify_all_ingredients(data['ingredients'])
                return jsonify({
                    'status': 200,
                    'data': ingr,
                })
            except Exception as e:
                print(e)
                return jsonify({
                    'status': 500,
                    'error': 'Something went wrong!',
                })

        return jsonify({
            'status': 400,
            'error': 'Bad request. Missing params.',
        })
