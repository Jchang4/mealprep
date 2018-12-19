const mongoose = require("mongoose");
const ingredientSchema = require("./schema");

const ingredientMongooseSchema = new mongoose.Schema(ingredientSchema);

module.exports = mongoose.model("Ingredient", ingredientMongooseSchema);
