"use strict";
const { getHtml, removeWhiteSpace } = require("./helpers");

const BASE_URL = "https://www.allrecipes.com/search/results/?sort=re&wt=";

exports.getRecipeUrlsFromIngredients = async function getRecipeUrlsFromIngredients(
  ingredients
) {
  const url = BASE_URL + ingredients.join("%20");
  const $ = await getHtml(url);
  // Get Urls
  const recipeUrls = $("article.fixed-recipe-card")
    .map((i, el) => {
      return $(el)
        .find(".grid-card-image-container a")
        .attr("href");
    })
    .get();
  console.log(`Found ${recipeUrls.length} urls from AllRecipe.`);
  // Clean-Up Urls
  return recipeUrls.map(url => {
    const lastIdx = url.indexOf("?") || url.length;
    return url.substring(0, lastIdx);
  });
};

exports.getRecipeDetails = async function getRecipeDetails(url) {
  const $ = await getHtml(url);
  return {
    title: getTitle($),
    imageUrl: getImgUrl($),
    ingredients: getIngredients($),
    instructions: getCookingInstructions($),
    cookingTime: getCookingTime($),
    fiveStarRating: getFiveStarRating($),
    notes: getFootNote($),
    source: {
      originalUrl: url,
      company: "AllRecipe"
    }
  };
};

function getTitle($) {
  return $("#recipe-main-content").text();
}

function getImgUrl($) {
  return $("div.hero-photo__wrap a img").attr("src");
}

function getIngredients($) {
  const ingredients = $("span.recipe-ingred_txt.added")
    .map((i, el) => $(el).text())
    .get();
  return ingredients.filter(ingred => ingred !== "Add all ingredients to list");
}

function getCookingInstructions($) {
  const instructions = $("span.recipe-directions__list--item")
    .map((i, el) => $(el).text())
    .get();
  return instructions.map(removeWhiteSpace).filter(i => !!i);
}

function getCookingTime($) {
  const prepTime = $('time[itemprop="prepTime"]').text();
  const cookTime = $('time[itemprop="cookTime"]').text();
  const totalTime = $('time[itemprop="totalTime"]').text();
  return {
    prepTime,
    cookTime,
    totalTime
  };
}

function getFiveStarRating($) {
  const fiveStarRating = $(".rating-stars").attr("data-ratingstars");
  return fiveStarRating ? Number(fiveStarRating) : undefined;
}

function getFootNote($) {
  return $("section.recipe-footnotes li")
    .map((i, el) => $(el).text())
    .get();
}
