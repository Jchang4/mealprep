"use strict";
const express = require("express");
const app = express();

const scraper = require("./scrapers");

app.get("/recipe", async (req, res) => {
  const ingredients = req.query.i;
  const numResults = req.query.r || 5;

  const recipes = await scraper(ingredients, numResults);

  return res.json({
    status: 200,
    data: recipes
  });
});

app.listen(5000, () => {
  console.log("Starting App on PORT: 5000");
});
