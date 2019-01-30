"use strict";
const P = require("bluebird");
const { getHtml, asQueryList, removeWhiteSpace } = require("./helpers");

const BASE_URL = "https://www.budgetbytes.com/?s=";

exports.getRecipeUrlsFromIngredients = async function getRecipeUrlsFromIngredients(
  ingredients
) {
  const url = BASE_URL + asQueryList(ingredients);
  const $ = await getHtml(url);
  const recipeUrls = $("article.post.teaser-post.search-post")
    .map((i, el) => {
      return $(el)
        .find("a")
        .attr("href");
    })
    .get();
  console.log(`Found ${recipeUrls.length} urls from BudgetBytes.`);
  return recipeUrls;
};

exports.getRecipeDetails = async function getRecipeDetails(url) {
  const $ = await getHtml(url);
  return {
    title: getTitle($),
    imgUrl: getImgUrl($),
    ingredients: getIngredients($),
    instructions: getCookingInstructions($),
    cookingTime: getCookingTime($),
    fiveStarRating: getFiveStarRating($),
    source: {
      recipeUrl: url,
      source: "BudgetBytes"
    }
  };
};

function getTitle($) {
  return $("h1.title").text();
}

function getImgUrl($) {
  const img = $("div.wprm-recipe-image img");
  const imgUrl =
    img.attr("data-lazy-srcset") ||
    img.attr("data-lazy-src") ||
    img.attr("src");
  return imgUrl ? imgUrl.split(" ")[0] : "";
}

function getIngredients($) {
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

function getCookingInstructions($) {
  return $("div.wprm-recipe-instruction-text")
    .map((i, el) => $(el).text())
    .get();
}

function getCookingTime($) {
  const prepTime = $("div.wprm-recipe-prep-time-container")
      .find(".wprm-recipe-time")
      .text()
  const cookTime = $("div.wprm-recipe-cook-time-container")
      .find(".wprm-recipe-time")
      .text()
  const totalTime = $("div.wprm-recipe-total-time-container")
      .find(".wprm-recipe-time")
      .text()
  return {
    prepTime: prepTime.replace("hr", "h").replace("mins", "m"),
    cookTime: cookTime.replace("hr", "h").replace("mins", "m"),,
    totalTime: totalTime.replace("hr", "h").replace("mins", "m"),
  };
}

function getFiveStarRating($) {
  const fiveStarRating = $("span.wprm-recipe-rating-average").text();
  return fiveStarRating ? Number(fiveStarRating) : undefined;
}
