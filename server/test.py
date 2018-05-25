import requests
from pprint import pprint
from mealprep.unitconverter import convert_unit, is_valid_unit
import mealprep.food_services.food2fork as F2F
from mealprep.api.routes.combined_ingredients import combine_classified_ingredients
from config.env import NLP_SERVICE_URL

if __name__ == '__main__':
    CLF_INGREDIENTS = [
        {'name': 'peanut butter',
         'original': '5 tablespoons of peanut butter',
         'unit': 'tablespoon',
         'quantity': '5',
         'comment': '',
         'other': 'of'},
        {'name': 'peanut butter',
         'original': '2 scoops of peanut butter',
         'unit': 'scoops',
         'quantity': '2',
         'comment': '',
         'other': 'of'},
        {'name': 'peanut butter',
         'original': '3 cups peanut butter',
         'unit': 'cup',
         'quantity': '3',
         'comment': '',
         'other': ''},
        {'name': 'peanut butter',
         'original': '1 small teaspoon peanut butter',
         'unit': 'teaspoon',
         'quantity': '1',
         'comment': 'small',
         'other': ''},
    ]

    pprint(combine_classified_ingredients(CLF_INGREDIENTS))
