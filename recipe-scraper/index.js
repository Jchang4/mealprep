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

  const queries = [
    { q: "chicken", number: 10, offset: 15 },
    { q: "steak", number: 10, offset: 10 },
    { q: "burger", number: 10, offset: 10 },
    { q: "salad", number: 10, offset: 0 }
  ];

  try {
    for (let i = 0; i < queries.length; i++) {
      const query = queries[i];
      console.log("Query:", query.q);
      const recipeIds = await spoon.getRecipeIdsFromQuery(query.q, {
        number: query.number,
        offset: query.offset
      });
      await delay(randomInterval());
      const recipeDetails = await spoon.getRecipeDetails(recipeIds);
      spoon.printRemainingRequests();
      await spoon.saveToMongo(recipeDetails);
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
