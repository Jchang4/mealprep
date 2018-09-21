"""
    http://food2fork.com/about/api
"""

import requests

# API_KEY = '7fbd2219867f3e50aa021c986cf36d1c' # roar4444@yahoo.com
API_KEY = 'd92fa4eed495160b9e54f57709fe3227' # justinchangmusic@gmail.com
SEARCH_URL = 'http://food2fork.com/api/search'
GET_URL = 'http://food2fork.com/api/get'


def search(query, sort='r', page='1'):
    """ Search for new recipes """
    params = {
        'key': API_KEY,
        'q': query,
        'page': page,
        'sort': sort,
    }
    r = requests.get(SEARCH_URL, params=params)
    return r.json()

def get_recipe(recipeId):
    """ Get recipe by recipe_id """
    params = {
        'key': API_KEY,
        'rId': recipeId
    }
    res = requests.get(GET_URL, params=params)
    res = res.json()
    if res and res.get('recipe'):
        return res['recipe']

    return False

def get_sort(user_input):
    """ Change user_inputted sort parameter to 't' or 'r' """
    if user_input == 'r' or user_input == 'rating' or user_input == 'ratings':
        return 'r'
    elif user_input == 't' or user_input == 'trending':
        return 't'
    else:
        return False


if __name__ == '__main__':
    f = Food2Fork()
    r = search('salmon,spinach,tomatoes')
    r = get_recipe('967fed')
    print(r)
