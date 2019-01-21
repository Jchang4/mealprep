import re

import requests
from bs4 import BeautifulSoup


def remove_whitespace_and_newline_chars(string):
    """ Remove two or more spaces and new-line characters """
    return re.sub(r"\s{2,}|\n", "", string)


def get_title(soup):
    """ Get the title of the recipe """
    el = soup.find("h1", id="recipe-main-content")
    if el:
        return el.get_text()
    return ""


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
    els = soup.select("ol.recipe-directions__list li.step")
    instructions = []
    for el in els:
        t = el.get_text()
        t = remove_whitespace_and_newline_chars(t)
        instructions.append(t)

    prep_time = soup.find("time", itemprop="prepTime")
    cook_time = soup.find("time", itemprop="cookTime")
    total_time = soup.find("time", itemprop="totalTime")

    return {
        "instructions": instructions,
        "prepTime": prep_time.get_text() if prep_time else "",
        "cookTime": cook_time.get_text() if cook_time else "",
        "totalTime": total_time.get_text() if total_time else "",
    }


def get_five_star_rating(soup):
    """ Get the 5-star rating on the page """
    return soup.find("div", "rating-stars")["data-ratingstars"]


def get_footnote(soup):
    els = soup.select("section.recipe-footnotes ul")
    footnote = []
    for e in els:
        t = e.get_text()
        t = remove_whitespace_and_newline_chars(t)
        footnote.append(t)
    return footnote


def get_recipe_details(url):
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
