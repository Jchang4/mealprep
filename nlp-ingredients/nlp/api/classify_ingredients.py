from flask import request, jsonify
from nlp.nlp import app
from nlp.api.helpers import classify_ingredients

@app.route("/", methods=['POST'])
def classify_ingredients_handler():
    """ Classify ingredients
        Return:
               <Int> status  :  HTTP status code
            List<Dict> data  :  list of classified ingredients
            i.e.
                {
                    original: '1 stick of butter',
                    name: 'butter',
                    quantity: 1,
                    unit: 'stick',
                    comment: ''
                }
    """
    req_data = request.get_json(force=True, silent=True) or {}
    ingredients = req_data.get('ingredients')

    # Ensure ingredients is a list
    if not ingredients or type(ingredients) is not list:
        return jsonify({
            'status': 400,
            'error': 'Bad Request. Must supply a list of ingredients.'
        })

    classified_ingredients = classify_ingredients(ingredients)
    app.logger.info('Process ')

    return jsonify({
        'status': 200,
        'data': classified_ingredients
    })
