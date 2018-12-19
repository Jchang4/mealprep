const Spoonacular = require("./spoonacular");

const appKey = "vfRhsTH2n9msha3zuOqELQn1TKa9p1R7bYMjsn9ftoeBFEyIVV";

const spoon = new Spoonacular(appKey);

async function main() {
  const recipeIds = await spoon.getRecipeIdsFromQuery("burger");
  console.log({ recipeIds });
  console.log({
    remainingRequests: spoon.remainingRequests,
    remainingResults: spoon.remainingResults,
    remainingTinyRequests: spoon.remainingTinyRequests
  });
}

main();
