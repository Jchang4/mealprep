from flask import Blueprint, current_app, jsonify, request
from sklearn.externals import joblib

from ingredient_to_feature import ingredients_to_features

classify_ingredient_app = Blueprint('classify_ingredient_app', __name__)


@classify_ingredient_app.route("/classify", methods=['POST'])
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

    features = ingredients_to_features(ingredients)
    model = joblib.load('./data/logistic-regression-94.2.pickle')

    predictions = [0] * len(features)
    classified_ingredients = [0] * len(features)

    # Create 2D array of (word,label) pairs, i.e. [[(word,label), (word,label)]]
    for i, f in enumerate(features):
        preds = model.predict(f).tolist()
        predictions[i] = [(sent['word'], preds[j]) for j, sent in enumerate(f)]

    # Convert (word,label) pairs to classified ingredient
    for i, p in enumerate(predictions):
        curr_clf_ingreds = {
            'original': ingredients[i],
            'name': [],
            'quantity': 0,
            'unit': '',
            'comment': [],
        }
        for j, (word, label) in enumerate(p):
            if label == 'NAME':
                curr_clf_ingreds['name'].append(word)
            elif label == 'QUANTITY':
                curr_clf_ingreds['quantity'] += float(word)
            elif label == 'UNIT':
                curr_clf_ingreds['unit'] = word
            elif label == 'COMMENT':
                curr_clf_ingreds['comment'].append(word)
        curr_clf_ingreds['name'] = ' '.join(curr_clf_ingreds['name'])
        curr_clf_ingreds['comment'] = ' '.join(curr_clf_ingreds['comment'])
        classified_ingredients[i] = curr_clf_ingreds

    current_app.logger.info(f'Processed {len(ingredients)} ingredients')

    return jsonify({
        'status': 200,
        'data': classified_ingredients
    })
