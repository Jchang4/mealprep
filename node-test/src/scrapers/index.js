"use strict";
const P = require("bluebird");
const delay = require("delay");

const { asArray } = require("./helpers");

const AllRecipeScraper = require("./all-recipe");
const BudgetBytesScraper = require("./budget-bytes");

async function staggerNGetRecipesDetails({
  getRecipeDetails,
  urls,
  staggerDelay = 1000
}) {
  const recipes = [];
  for (let i = 0; i < urls.length; i++) {
    recipes.push(getRecipeDetails(urls[i]));
    if (i < urls.length - 1) {
      await delay(staggerDelay);
    }
  }
  return await P.all(recipes);
}

module.exports = async (ingredients, numResults = 5) => {
  const i = asArray(ingredients);
  const scrapers = [
    { Scraper: AllRecipeScraper, staggerDelay: 1000 },
    { Scraper: BudgetBytesScraper, staggerDelay: 100 }
  ];

  const responses = await P.map(scrapers, async ({ Scraper, staggerDelay }) => {
    const s = new Scraper();
    const recipeUrls = await s.getRecipeUrlsFromIngredients(i);
    return await staggerNGetRecipesDetails({
      getRecipeDetails: url => s.getRecipeDetails(url),
      urls: recipeUrls.slice(0, numResults),
      staggerDelay
    });
  });

  // Flatten results
  return responses
    .reduce((acc, r) => acc.concat(r), [])
    .sort((a, b) => {
      if (b && a) {
        return b.fiveStarRating - a.fiveStarRating;
      } else if (b) {
        return b;
      } else {
        return a;
      }
    });
};
