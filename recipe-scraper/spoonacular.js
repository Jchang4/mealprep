const axios = require("axios");
const P = require("bluebird");
const R = require("ramda");

const recipeModel = require("./mongo/recipe/model");
const ingredientModel = require("./mongo/ingredient/model");

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
    return P.all([
      this.saveRecipesToMongo(recipes),
      this.saveClassifiedIngredientsToMongo(recipes)
    ]);
  }

  async saveRecipesToMongo(recipes) {
    if (!recipes)
      throw new Error(
        "Must provide array of Spoonacular Recipe Details results."
      );

    return P.all(recipes, recipe => {
      const instructions = R.pipe(
        R.pathOr([], ["analyzedInstructions", "steps"]),
        R.map(({ step }) => step),
        R.filter(instr => !!instr)
      )(recipe);

      const ingredients = R.pipe(
        R.propOr([], "extendedIngredients"),
        R.map(ingred => ingred.original || ingred.originalString),
        R.filter(ingred => !!ingred)
      )(recipe);

      // Save Recipe to Mongo
      return recipeModel.create({
        title: recipe.title,
        source: {
          originalUrl: recipe.sourceUrl,
          company: new URL(recipe.sourceUrl).hostname,
          imageUrl: recipe.image,
          apiName: "spoonacular",
          recipeId: recipe.id
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

  async saveClassifiedIngredientsToMongo(recipes) {
    const allIngreds = R.pipe(
      R.map(R.propOr([], "extendedIngredients")),
      R.reduce((acc, ingreds) => acc.concat(ingreds), [])
    )(recipes);

    return P.map(allIngreds, ingred =>
      ingredientModel.create({
        aisle: ingred.aisle,
        consitency: ingred.consitency,
        name: ingred.name,
        original: ingred.original,
        amount: ingred.amount,
        unit: ingred.unit,
        meta: R.union(ingred.meta, ingred.metaInformation),
        measures: {
          us: ingred.us,
          metric: ingred.metric
        }
      })
    );
  }

  setRemainingRequests(headers) {
    this.remainingRequests = headers["x-ratelimit-requests-remaining"];
    this.remainingResults = headers["x-ratelimit-results-remaining"];
    this.remainingTinyRequests = headers["x-ratelimit-tinyrequests-remaining"];
  }

  printRemainingRequests() {
    console.log(
      JSON.stringify(
        {
          remainingRequests: this.remainingRequests,
          remainingResults: this.remainingResults,
          remainingTinyRequests: this.remainingTinyRequests
        },
        null,
        4
      )
    );
  }
}

module.exports = Spoonacular;
