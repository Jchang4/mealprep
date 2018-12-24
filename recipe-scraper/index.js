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
    { q: "chicken", number: 10, offset: 0 },
    { q: "steak", number: 5, offset: 0 },
    { q: "burger", number: 10, offset: 0 },
    { q: "salad", number: 5, offset: 0 },
    { q: "pasta", number: 5, offset: 0 },
    { q: "garlic", number: 10, offset: 0 },
    { q: "salmon", number: 5, offset: 0 },
    { q: "egg", number: 5, offset: 0 },
    { q: "sausage", number: 5, offset: 0 }
  ];

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
  console.log(JSON.stringify(queries));
  process.exit();
}

main();
