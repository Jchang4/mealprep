"use strict";
const express = require("express");
const app = express();

const scraper = require("./scrapers");

app.get("/recipe", async (req, res) => {
  const ingredients = req.query.i;
  const numResults = req.query.r || 5;
  const offset = req.query.offset || 0;

  console.log(
    `Getting ${numResults} results per scraper for ingredients: ${ingredients}`
  );

  try {
    const recipes = await scraper({ ingredients, numResults, offset });

    res.set("Access-Control-Allow-Origin", "*");
    res.json({
      status: 200,
      recipes
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
