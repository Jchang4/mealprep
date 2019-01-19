import requests
from bs4 import BeautifulSoup


def get_search_url(ingreds):
    """ Use list of ingredients in AllRecipe query parameters """
    return (
        f"https://www.allrecipes.com/search/results/?sort=re&wt={'%20'.join(ingreds)}"
    )


def get_recipe_urls(ingreds):
    """ Given a list of ingredients, return a list of AllRecipe recipe urls """
    search_url = get_search_url(ingreds)
    results_page = requests.get(search_url)
    soup = BeautifulSoup(results_page.text, "html.parser")

    recipes = soup.find_all("article", "fixed-recipe-card")
    recipe_urls = []
    for r in recipes:
        link = r.find("div", "grid-card-image-container").find("a")["href"]
        recipe_urls.append(link)

    return recipe_urls


if __name__ == "__main__":
    ingreds = ["chicken", "waffle"]
    urls = get_recipe_urls(ingreds)

    print(urls)
