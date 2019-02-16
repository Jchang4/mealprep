const P = require("bluebird");
const scraper = require("../scrapers");
const mongoConnection = require("../lib/mongo-connection");
const RecipeModel = require("../services/recipe");

async function getRecipes(ingredients) {
  const numResults = 1;
  const offset = 0;
  return scraper({ ingredients, numResults, offset });
}

(async () => {
  mongoConnection();

  const ingredients = [["chicken"], ["steak"], ["spinach"]];

  for (let i = 0; i < ingredients.length; i++) {
    const recipes = await getRecipes(ingredients[i]);
    await P.map(recipes, async r => {
      await RecipeModel.create(r);
      console.log(`Added recipe to DB: ${r.title}`);
    });
  }

  return;
})();
