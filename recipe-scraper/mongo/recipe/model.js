"use strict";

const mongoose = require("mongoose");
const recipeSchema = require("./schema");

const recipeMongooseSchema = new mongoose.Schema(recipeSchema);

module.exports = mongoose.model("Recipe", recipeMongooseSchema);
