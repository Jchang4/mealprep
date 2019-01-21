from time import sleep

from .get_recipe_details import get_recipe_details
from .get_recipe_urls import get_recipe_urls


def get_recipes_from_ingredients(ingredients, num_results=5):
    urls = get_recipe_urls(ingredients)[:num_results]
    recipes = []

    for url in urls:
        recipes.append(get_recipe_details(url))
        sleep(2)

    return recipes


if __name__ == "__main__":
    from pprint import pprint

    ingreds = ["eggs", "toast"]
    recipes = get_recipes_from_ingredients(ingreds)

    pprint(recipes)
