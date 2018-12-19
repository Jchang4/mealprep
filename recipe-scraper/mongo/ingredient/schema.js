export default {
  aisle: String,
  consitency: String,
  name: String,
  original: String,
  amount: Number,
  unit: String,
  meta: [String],
  measures: {
    us: {
      amount: Number,
      unitShort: String,
      unitLong: String
    },
    metric: {
      amount: Number,
      unitShort: String,
      unitLong: String
    }
  }

  //   original: {
  //     description: "Original ingredient string from recipe",
  //     type: String,
  //     required: true
  //   },
  //   name: {
  //     description: "Name of the ingredient",
  //     type: String,
  //     required: true
  //   },
  //   quantity: {
  //     description: "Amount of ingredient used in the recipe",
  //     type: String
  //   },
  //   unit: {
  //     description: "Unit of measurement used in the recipe",
  //     type: String
  //   },
  //   comment: {
  //     description: "Comments about the recipe - i.e. finely chopped",
  //     type: String
  //   }
};
