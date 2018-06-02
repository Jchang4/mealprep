from flask_restful import reqparse

def food2fork_args():
    parser = reqparse.RequestParser(trim=True)
    parser.add_argument('query',
                        type=str,
                        required=True,
                        help="List of ingredients, used to find recipes.")
    parser.add_argument('sort', type=str, help="Must be either letter: 'r' or 't'; for 'rating' and 'trending' respectively.")
    parser.add_argument('page', type=int, help="Must be an integer.")
    return parser


def nlp_ingredient_args():
    parser = reqparse.RequestParser(trim=True)
    parser.add_argument('original', type=str, required=True, help="Must include original ingredient text.")
    parser.add_argument('name', type=str, required=True, help="Must include ingredient name.")
    parser.add_argument('quantity', type=float, help="Must be a float.")
    parser.add_argument('unit', type=str, help="Must be a string.")
    parser.add_argument('comment', type=str, help="Parts of the ingredient that are comments - i.e. 'diced'.")
    parser.add_argument('force', type=bool, help="True/False whether to force add ingredient to database.")
    return parser

def classify_ingredient_args():
    parser = reqparse.RequestParser(trim=True)
    parser.add_argument('ingredients',
                        type=int,
                        action='append',
                        required=True,
                        help='Must supply a list of ingredients to classify.')
    return parser
