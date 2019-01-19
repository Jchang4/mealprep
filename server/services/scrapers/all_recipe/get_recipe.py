import re

import requests
from bs4 import BeautifulSoup

from services.scrapers.helpers import remove_whitespace_and_newline_chars


def get_title(soup):
    """ Get the title of the recipe """
    return soup.find("h1", id="recipe-main-content").get_text()


def get_ingredients(soup):
    """ Given a BeautifulSoup html object, return the ingredients """
    els = soup.find_all("span", "recipe-ingred_txt")
    ingreds = []
    for i, e in enumerate(els):
        text = e.get_text()
        if text and text != "Add all ingredients to list":
            ingreds.append(text)
    return ingreds


def get_cooking_instructions(soup):
    """ Get the cooking insutructions, prep time, cook time, and ready-in time """
    instructions = []
    for el in soup.find("ol", "recipe-directions__list").find_all("li", "step"):
        text = el.get_text()
        instructions.append(remove_whitespace_and_newline_chars(text))

    return {
        "instructions": instructions,
        "prepTime": soup.find("time", itemprop="prepTime").get_text(),
        "cookTime": soup.find("time", itemprop="cookTime").get_text(),
        "readyIn": soup.find("time", itemprop="totalTime").get_text(),
    }


def get_five_star_rating(soup):
    """ Get the 5-star rating on the page """
    return soup.find("div", "rating-stars")["data-ratingstars"]


def get_footnote(soup):
    all_text = soup.find("section", "recipe-footnotes").find("ul").get_text()
    footnote = []
    for t in all_text:
        formatted_t = remove_whitespace_and_newline_chars(t)
        if t != "\n" and formatted_t:
            footnote.append(formatted_t)
    return footnote


def get_recipe(url):
    """ Webscrape recipe information from AllRecipe url """
    page = requests.get(url)
    soup = BeautifulSoup(page.text, "html.parser")
    return {
        "title": get_title(soup),
        "ingredients": get_ingredients(soup),
        "instructions": get_cooking_instructions(soup),
        "fiveStarRating": get_five_star_rating(soup),
        "footnote": get_footnote(soup),
    }


if __name__ == "__main__":
    from pprint import pprint

    recipe = get_recipe(
        "https://www.allrecipes.com/recipe/190857/leftover-pancake-breakfast-sandwich"
    )
    pprint(recipe)
