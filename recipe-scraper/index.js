const mongoose = require("mongoose");
const delay = require("delay");

const Spoonacular = require("./spoonacular");

const appKey = "vfRhsTH2n9msha3zuOqELQn1TKa9p1R7bYMjsn9ftoeBFEyIVV";
const mongoConnectionUri = "mongodb://0.0.0.0:27017/mealprep";

const randomInterval = (
  { low = 12, high = 18 } = {
    low: 12,
    high: 18
  }
) => {
  return (Math.random() * (high - low) + low) * 1000; // milliseconds
};

async function main() {
  mongoose.connect(
    mongoConnectionUri,
    { useNewUrlParser: true }
  );
  mongoose.set("useCreateIndex", true);

  const spoon = new Spoonacular(appKey);

  const queries = ["chicken parmesan"];

  try {
    for (let i = 0; i < queries.length; i++) {
      const q = queries[i];
      console.log("Query:", q);
      const recipeIds = await spoon.getRecipeIdsFromQuery(q, 5);
      await delay(randomInterval());
      const recipeDetails = await spoon.getRecipeDetails(recipeIds);
      await spoon.saveToMongo(recipeDetails);
      console.log(`Saved ${recipeDetails.length} recipes to Mongo!`);
      spoon.printRemainingRequests();
      console.log("  ------------------------");
      if (
        spoon.remainingRequests < 1 ||
        spoon.remainingResults < 1 ||
        spoon.remainingTinyRequests < 1
      ) {
        console.log("Ran out of API calls for the day!");
        break;
      }
      await delay(randomInterval());
    }
  } catch (err) {
    spoon.printRemainingRequests();
    console.log(err);
  }

  process.exit();
}

main();
