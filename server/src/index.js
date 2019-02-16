"use strict";
const express = require("express");
const app = express();

const scraper = require("./scrapers");
const RecipeModel = require("./services/recipe");

const mongoConnection = require("./lib/mongo-connection");
const { asArray } = require("./helpers");

app.get("/recipe", async (req, res) => {
  const ingredients = req.query.i;
  const numResults = Number(req.query.r) || 5;
  const offset = Number(req.query.offset) || 0;

  console.log(
    `Getting ${numResults} results with offset ${offset} per scraper for ingredients: ${ingredients}`
  );

  try {
    const recipes = await scraper({ ingredients, numResults, offset });

    res.set("Access-Control-Allow-Origin", "*");
    return res.json({
      status: 200,
      recipes
    });
  } catch (err) {
    console.log(err);
    return res.json({
      status: 500,
      error: err
    });
  }
});

app.get("/recipeApi", async (req, res) => {
  const ingredients = asArray(req.query.i);
  const numResults = Number(req.query.r) || 15;
  const offset = Number(req.query.offset) || 0;

  console.log(
    `Getting ${numResults} results with offset ${offset} from DB for ingredients: ${ingredients}`
  );

  try {
    mongoConnection();
    const recipes = await RecipeModel.find({
      ingredients: { $in: ingredients.map(i => new RegExp(i, "g")) }
    })
      .skip(offset)
      .limit(numResults)
      .lean()
      .exec();
    return res.json({
      status: 200,
      recipes
    });
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    return res.json({
      status: 500,
      error
    });
  }
});

app.listen(5000, () => {
  console.log("Starting App on PORT: 5000");
});
