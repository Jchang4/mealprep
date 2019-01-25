"use strict";
const P = require("bluebird");
const delay = require("delay");

const { asArray } = require("./helpers");

const allRecipeScraper = require("./all-recipe");
const budgetBytesScraper = require("./budget-bytes");

const scrapers = [
  { scraper: allRecipeScraper, staggerDelay: 1000 },
  { scraper: budgetBytesScraper, staggerDelay: 100 }
];

async function staggerNGetRecipesDetails({
  getRecipeDetails,
  urls,
  staggerDelay
}) {
  const recipes = [];
  for (let i = 0; i < urls.length; i++) {
    recipes.push(getRecipeDetails(urls[i]));
    if (i < urls.length - 1) {
      await delay(staggerDelay);
    }
  }
  return P.all(recipes);
}

module.exports = async ({ ingredients, numResults, offset }) => {
  const i = asArray(ingredients);

  const responses = await P.map(scrapers, async ({ scraper, staggerDelay }) => {
    const recipeUrls = await scraper.getRecipeUrlsFromIngredients(i);
    return staggerNGetRecipesDetails({
      getRecipeDetails: url => scraper.getRecipeDetails(url),
      urls: recipeUrls.slice(offset, offset + numResults),
      staggerDelay
    });
  });

  // Flatten results
  const recipes = responses.reduce((acc, r) => acc.concat(r), []);

  console.log(`Sending ${recipes.length} recipes.`);

  return recipes;
};
