import re

import requests
from bs4 import BeautifulSoup


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
    useless_spaces = re.compile(r"\s{2,}")
    for el in soup.find("ol", "recipe-directions__list").find_all("li", "step"):
        text = el.get_text()
        instructions.append(re.sub(r"\s{2,}|\n", "", text))

    return {
        "instructions": instructions,
        "prepTime": soup.find("time", itemprop="prepTime").get_text(),
        "cookTime": soup.find("time", itemprop="cookTime").get_text(),
        "readyIn": soup.find("time", itemprop="totalTime").get_text(),
    }


# def get_five_star_rating():
#     """ Get the 5-star rating on the page """
#     pass


# def get_footnote():
#     pass


def get_recipe(url):
    """ Webscrape recipe information from AllRecipe url """
    page = requests.get(url)
    soup = BeautifulSoup(page.text, "html.parser")
    return {
        "title": get_title(soup),
        "ingredients": get_ingredients(soup),
        "instructions": get_cooking_instructions(soup),
        # "fiveStarRating": get_five_star_rating(soup),
        # "footnote": get_footnote(soup),
    }
