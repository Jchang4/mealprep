"use strict";
const P = require("bluebird");
const { getHtml, asQueryList, removeWhiteSpace } = require("./helpers");

class BudgetBytesScraper {
  constructor() {
    this.BASE_URL = "https://www.budgetbytes.com/?s=";
  }

  async getRecipeUrlsFromIngredients(ingredients) {
    const url = this.BASE_URL + asQueryList(ingredients);
    const $ = await getHtml(url);
    return $("article.post.teaser-post.search-post")
      .map((i, el) => {
        return $(el)
          .find("a")
          .attr("href");
      })
      .get();
  }

  async getRecipeDetails(url) {
    const $ = await getHtml(url);
    return {
      title: this.getTitle($),
      imgUrl: this.getImgUrl($),
      // ingredients: this.getIngredients($),
      // instructions: this.getCookingInstructions($),
      cookingTime: this.getCookingTime($),
      fiveStarRating: this.getFiveStarRating($),
      source: {
        recipeUrl: url,
        source: "BudgetBytes"
      }
    };
  }

  getTitle($) {
    return $("h1.title").text();
  }

  getImgUrl($) {
    const img = $("div.wprm-recipe-image img");
    return (
      img.attr("data-lazy-srcset") ||
      img.attr("data-lazy-src") ||
      img.attr("src")
    );
  }

  getIngredients($) {
    return $("li.wprm-recipe-ingredient")
      .map((i, el) => {
        const ingredient = [
          $(el)
            .find("span.wprm-recipe-ingredient-amount")
            .text(),
          $(el)
            .find("span.wprm-recipe-ingredient-unit")
            .text(),
          $(el)
            .find("span.wprm-recipe-ingredient-name")
            .text()
        ];
        return ingredient.join(" ");
      })
      .get();
  }

  getCookingInstructions($) {
    return $("div.wprm-recipe-instruction-text")
      .map((i, el) => $(el).text())
      .get();
  }

  getCookingTime($) {
    return {
      prepTime: $("div.wprm-recipe-prep-time-container")
        .find(".wprm-recipe-time")
        .text(),
      cookTime: $("div.wprm-recipe-cook-time-container")
        .find(".wprm-recipe-time")
        .text(),
      totalTime: $("div.wprm-recipe-total-time-container")
        .find(".wprm-recipe-time")
        .text()
    };
  }

  getFiveStarRating($) {
    const fiveStarRating = $("span.wprm-recipe-rating-average").text();
    return fiveStarRating ? Number(fiveStarRating) : undefined;
  }
}

module.exports = BudgetBytesScraper;
