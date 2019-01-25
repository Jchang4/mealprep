"use strict";
const express = require("express");
const app = express();

const scraper = require("./scrapers");

app.get("/recipe", async (req, res) => {
  const ingredients = req.query.i;
  const numResults = req.query.r || 5;

  console.log("Getting recipes for ingredients:", ingredients);

  try {
    const recipes = await scraper(ingredients, numResults);

    res.json({
      status: 200,
      data: recipes
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: 500,
      error: err
    });
  }
});

app.listen(5000, () => {
  console.log("Starting App on PORT: 5000");
});
