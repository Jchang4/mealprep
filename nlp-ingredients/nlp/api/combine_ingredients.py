from flask import request, jsonify
from nlp.nlp import app
from nlp.unitconverter import is_valid_unit, convert_from_to, combine_to_largest
from nlp.api.helpers import classify_ingredients

def combine_classified_ingredients(classified_ingredients):
    """ Combine like ingredients and combine quantities
        Returns: List<Dict>
    """
    final_ingr = []
    combined_ingr = {} # these have units & quantities

    for c in classified_ingredients:
        name = c['name']
        unit = c['unit']
        quant = c['quantity']
        # if has unit and quantity, combine ingredients
        if unit and quant:
            if is_valid_unit(unit):
                if not combined_ingr.get(name):
                    combined_ingr[name] = c
                else:
                    prev_ingr = combined_ingr[name]
                    new_unit, new_qty = combine_to_largest(unit,
                                                 float(quant),
                                                 prev_ingr['unit'],
                                                 float(prev_ingr['quantity']))
                    # Update props
                    prev_ingr['unit'] = new_unit
                    prev_ingr['quantity'] = new_qty
                    prev_ingr['original'] = [prev_ingr['original'], c['original']]
                    if c['comment']:
                        prev_ingr['comment'] = [prev_ingr['comment'], c['comment']]
                    if c['other']:
                        prev_ingr['other'] = [prev_ingr['other'], c['other']]
            else:
                final_ingr.append(c)
        # else just add to final_ingr
        else:
            final_ingr.append(c)

    # Add combined_ingr to final_ingr
    for _,ingr in combined_ingr.items():
        final_ingr.append(ingr)

    # Sort so like items are next to each other
    final_ingr.sort(key=lambda x: x['name'].lower())

    return final_ingr


@app.route('/combine', methods=['POST'])
def combine_ingredients_handler():
    """ Classify ingredients and combine them as best as possible """
    req_data = request.get_json(force=True, silent=True) or {}
    ingredients = req_data.get('ingredients')

    # Handle Bad Request
    if not ingredients or type(ingredients) is not list:
        return jsonify({
            'status': 400,
            'error': 'Bad Request. You must provide a list of ingredients.'
        })

    # Classify ingredients
    clf_ingr = classify_ingredients(ingredients)
    combined_ingr = combine_classified_ingredients(clf_ingr)
    return jsonify({
        'status': 200,
        'ingredients': combined_ingr,
    })
