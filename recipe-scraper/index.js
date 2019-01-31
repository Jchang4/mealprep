const mongoose = require("mongoose");
const delay = require("delay");

const Spoonacular = require("./spoonacular");

const appKey = process.env.SPOONACULAR_KEY;
const mongoConnectionUri = "mongodb://0.0.0.0:27017/mealprep";

async function main() {
  mongoose.connect(mongoConnectionUri, { useNewUrlParser: true });
  mongoose.set("useCreateIndex", true);

  const spoon = new Spoonacular(appKey);

  const queries = [
    { q: "chicken", number: 10, offset: 1315 },
    { q: "steak", number: 5, offset: 1201 },
    { q: "burger", number: 5, offset: 1224 },
    { q: "salad", number: 5, offset: 1195 },
    { q: "pasta", number: 5, offset: 1148 },
    { q: "garlic", number: 5, offset: 1021 },
    { q: "salmon", number: 5, offset: 960 },
    { q: "egg", number: 5, offset: 929 },
    { q: "sausage", number: 5, offset: 881 }
  ];

  for (let iter = 0; iter < 1; iter++) {
    for (let i = 0; i < queries.length; i++) {
      const query = queries[i];
      console.log("Query:", query.q);
      const results = await spoon.getAndSaveRecipesToMongo(query.q, {
        number: query.number,
        offset: query.offset
      });
      await delay(1200);
      queries[i].offset += results.length;
    }
  }
  console.log(JSON.stringify(queries));
  process.exit();
}

main();
