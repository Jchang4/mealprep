const delay = require("delay");
const { getHtml, asQueryList, removeWhiteSpace } = require("./helpers");

class BudgetBytesScraper {
  constructor() {
    this.BASE_URL = "https://www.budgetbytes.com/?s=";
  }

  async getRecipeUrlsFromIngredients(ingredients) {
    const $ = getHtml(this.BASE_URL + asQueryList(ingredients));
    return $("article.post.teaser-post.search-post")
      .map((i, el) => {
        return $(el)
          .find("a")
          .attr("href");
      })
      .get();
  }

  async staggerNGetRecipesDetails(urls) {}

  async getRecipeDetails(url) {}
}
