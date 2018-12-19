import mongoose from "mongoose";

const Spoonacular = require("./spoonacular");

const appKey = "vfRhsTH2n9msha3zuOqELQn1TKa9p1R7bYMjsn9ftoeBFEyIVV";
const mongoConnectionUri = "mongodb://0.0.0.0:27017/mealprep";

async function main() {
  mongoose.connect(
    mongoConnectionUri,
    { useNewUrlParser: true }
  );
  mongoose.set("useCreateIndex", true);

  const spoon = new Spoonacular(appKey);

  const queries = ["salmon"];

  for (let i = 0; i < queries.length; i++) {
    if (
      spoon.remainingRequests < 1 ||
      spoon.remainingResults < 1 ||
      spoon.remainingTinyRequests < 1
    ) {
      console.log("Ran out of API calls for the day!");
      spoon.printRemainingRequests();
      break;
    }

    const q = queries[i];
    const recipeIds = await spoon.getRecipeIdsFromQuery(q, 1);
    const recipeDetails = await spoon.getRecipeDetails(recipeIds);
    await spoon.saveToMongo(recipeDetails);
    console.log(`Saved ${recipeDetails.length} recipes to Mongo!`);
    spoon.printRemainingRequests();
  }
}

main();
