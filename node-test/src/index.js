const express = require("express");
const app = express();

const { asArray } = require("./helpers");
const AllRecipeScraper = require("./scrapers/all-recipe");

app.get("/recipe", async (req, res) => {
  const ingredients = req.query.i;
  const numResults = req.query.r || 2;

  const a = new AllRecipeScraper();
  console.log("Getting recipe urls...");
  const recipeUrls = await a.getRecipeUrlsFromIngredients(asArray(ingredients));
  console.log(`Getting ${numResults} recipes...`);
  const recipes = await a.staggerNGetRecipesDetails(
    recipeUrls.slice(0, numResults)
  );

  return res.json({
    status: 200,
    data: recipes.sort((a, b) => b.fiveStarRating - a.fiveStarRating)
  });
});

app.listen(3000, () => {
  console.log("Starting App on PORT: 3000");
});
