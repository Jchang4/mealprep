from flask import request, jsonify
from flask_restful import Resource
import requests
from mealprep.api.helpers import classify_all_ingredients
from mealprep.models import db, NLPIngredient


class NLPIngredientApi(Resource):
    def post(self):
        req_data = request.get_json(force=True, silent=True) or {}

        if self.has_required_data(req_data):
            new_ingredient = NLPIngredient(original=(req_data['original'] or None),
                                        name=(req_data['name'] or None),
                                        quantity=(float(req_data.get('quantity'))\
                                            if req_data.get('quantity')\
                                            else None),
                                        unit=(req_data.get('unit') or None),
                                        comment=(req_data.get('comment') or None))

            # Add and save to database
            db.session.add(new_ingredient)
            db.session.commit()

            return jsonify({
                'status': 200,
                'data': new_ingredient.to_dict(),
            })
        else:
            return jsonify({
                'status': 400,
                'error': 'Bad request. Missing required parameters or bad parameters.',
            })


    def has_required_data(self, data):
        if not data.get('original') or not data.get('name'):
            return False
        if data.get('quantity'): # Ensure quantity can be a float
            quant = data['quantity']
            try:
                float(quant)
            except:
                return False
        return True


class ClassifyIngredientApi(Resource):
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
