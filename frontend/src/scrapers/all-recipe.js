"use strict";
import { getHtml, removeWhiteSpace } from "./helpers";

class AllRecipeScraper {
  static BASE_URL = "https://www.allrecipes.com/search/results/?sort=re&wt=";

  async getRecipeUrlsFromIngredients(ingredients) {
    const url = this.BASE_URL + ingredients.join("%20");
    const $ = await getHtml(url);
    // Get Urls
    const recipeUrls = $("article.fixed-recipe-card")
      .map((i, el) => {
        return $(el)
          .find(".grid-card-image-container a")
          .attr("href");
      })
      .get();
    // Clean-Up Urls
    return recipeUrls.map(url => {
      const lastIdx = url.indexOf("?") || url.length;
      return url.substring(0, lastIdx);
    });
  }

  async getRecipeDetails(url) {
    const $ = await getHtml(url);
    return {
      title: this.getTitle($),
      imgUrl: this.getImgUrl($),
      ingredients: this.getIngredients($),
      instructions: this.getCookingInstructions($),
      cookingTime: this.getCookingTime($),
      fiveStarRating: this.getFiveStarRating($),
      footnote: this.getFootNote($),
      source: {
        recipeUrl: url,
        source: "AllRecipe"
      }
    };
  }

  getTitle($) {
    return $("#recipe-main-content").text();
  }

  getImgUrl($) {
    return $("div.hero-photo__wrap a img").attr("src");
  }

  getIngredients($) {
    const ingredients = $("span.recipe-ingred_txt.added")
      .map((i, el) => $(el).text())
      .get();
    return ingredients.filter(
      ingred => ingred !== "Add all ingredients to list"
    );
  }

  getCookingInstructions($) {
    const instructions = $("span.recipe-directions__list--item")
      .map((i, el) => $(el).text())
      .get();
    return instructions.map(removeWhiteSpace).filter(i => !!i);
  }

  getCookingTime($) {
    const prepTime = $('time[itemprop="prepTime"]').text();
    const cookTime = $('time[itemprop="cookTime"]').text();
    const totalTime = $('time[itemprop="totalTime"]').text();
    return {
      prepTime,
      cookTime,
      totalTime
    };
  }

  getFiveStarRating($) {
    const fiveStarRating = $(".rating-stars").attr("data-ratingstars");
    return fiveStarRating ? Number(fiveStarRating) : undefined;
  }

  getFootNote($) {
    return $("section.recipe-footnotes li")
      .map((i, el) => $(el).text())
      .get();
  }
}

export default AllRecipeScraper;
