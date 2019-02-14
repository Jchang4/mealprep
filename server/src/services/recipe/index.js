const mongoose = require("mongoose");
const schema = require("./schema");

const mongooseSchema = new mongoose.Schema(schema);

module.exports = mongoose.model("Recipe", mongooseSchema);
