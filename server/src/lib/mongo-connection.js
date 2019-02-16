"use strict";

const mongoose = require("mongoose");

module.exports = () => {
  const ENV = process.env.NODE_ENV || "local";

  mongoose.connect("mongodb://localhost/mealprep");
};
