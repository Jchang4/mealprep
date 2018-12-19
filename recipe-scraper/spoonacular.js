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

  async getRecipeIdsFromQuery(
    query,
    { number = 5, offset = 0, cuisine, diet } = {
      number: 5,
      offset: 0
    }
  ) {
    const finalQuery = query.split(" ").join("+");
    const params = {
      query: finalQuery,
      number,
      offset,
      limitLicense: false,
      ranking: 2 // by relevance
    };

    try {
      const res = await this.axios.get(
        "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex",
        { params }
      );
      this.setRemainingRequests(res.headers);
      return res.data.results.map(({ id }) => id);
    } catch (err) {
      this.printRemainingRequests();
      console.log(err);
    }
  }

  async getRecipeDetails(recipeIds) {
    if (!recipeIds || !recipeIds.length)
      throw new Error("RecipeIds cannot be empty.");
    const finalRecipeIds = recipeIds.slice(
      0,
      Math.min(recipeIds.length, this.remainingRequests)
    );

    try {
      const res = await this.axios.get(
        `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/informationBulk?ids=${finalRecipeIds.join(
          "%2C"
        )}`,
        {
          params: {
            includeNutrition: false
          }
        }
      );
      this.setRemainingRequests(res.headers);
      return res.data;
    } catch (err) {
      this.printRemainingRequests();
      console.log(err);
    }
  }

  async saveToMongo(recipes) {
    if (!recipes)
      throw new Error(
        "Must provide array of Spoonacular Recipe Details results."
      );
    return P.all([
      this.saveRecipesToMongo(recipes),
      this.saveClassifiedIngredientsToMongo(recipes)
    ]);
  }

  async saveRecipesToMongo(recipes) {
    return P.map(recipes, recipe => {
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
    this.remainingRequests = Number(headers["x-ratelimit-requests-remaining"]);
    this.remainingResults = Number(headers["x-ratelimit-results-remaining"]);
    this.remainingTinyRequests = Number(
      headers["x-ratelimit-tinyrequests-remaining"]
    );
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
