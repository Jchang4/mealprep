const axios = require("axios");
const P = require("bluebird");
const R = require("ramda");

const recipeModel = require("./recipe/model");

class Spoonacular {
  constructor(appKey) {
    if (!appKey) throw new Error("Spoonacular App Key is required!");
    this.appKey = appKey;
    this.axios = axios.create({
      headers: { "X-Mashape-Key": appKey }
    });
    this.remainingRequests = -1;
    this.remainingResults = -1;
    this.remainingTinyRequests = -1;
  }

  async getRecipeIdsFromQuery(query, number = 5) {
    const finalQuery = query.split(" ").join("+");
    const res = await this.axios.get(
      "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/autocomplete",
      {
        params: {
          number,
          query: encodeURIComponent(finalQuery)
        }
      }
    );
    this.setRemainingRequests(res.headers);
    return res.data.map(({ id }) => id);
  }

  async getRecipeDetails(recipeIds) {
    if (!recipeIds || !recipeIds.length)
      throw new Error("RecipeIds cannot be empty.");
    const finalRecipeIds = recipeIds.join(",");
    const res = await this.axios.get(
      "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/informationBulk",
      {
        params: {
          includeNutrition: false,
          query: encodeURIComponent(finalRecipeIds)
        }
      }
    );
    this.setRemainingRequests(res.headers);
    return res.data;
  }

  async saveToMongo(recipes) {
    if (!recipes)
      throw new Error(
        "Must provide array of Spoonacular Recipe Details results."
      );

    return P.all(recipes, recipe => {
      const instructions = R.pipe(
        R.pathOr([], ["analyzedInstructions", "steps"]),
        R.map(({ step }) => step)
      )(recipe);
      const ingredients = R.pipe(
        R.propOr([], "extendedIngredients"),
        R.map(ingred => ingred.original || ingred.originalString)
      )(recipe);
      return recipeModel.create({
        title: recipe.title,
        source: {
          originalUrl: recipe.sourceUrl,
          company: new URL(recipe.sourceUrl).hostname,
          imageUrl: recipe.image,
          apiName: "spoonacular",
          apiId: recipe.id
        },
        cookTime: {
          prep: recipe.preparationMinutes,
          cook: recipe.cookingMinutes,
          totalTime: recipe.readyInMinutes
        },
        ingredients: ingredients.length ? ingredients : undefined,
        instructions: instructions.length ? instructions : undefined
      });
    });
  }

  setRemainingRequests(headers) {
    this.remainingRequests = headers["x-ratelimit-requests-remaining"];
    this.remainingResults = headers["x-ratelimit-results-remaining"];
    this.remainingTinyRequests = headers["x-ratelimit-tinyrequests-remaining"];
  }
}

module.exports = Spoonacular;
