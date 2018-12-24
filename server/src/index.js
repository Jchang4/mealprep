const express = require("express");
const app = express();

// Environment Variables
const { PORT } = require("./config");

// Services
const recipeService = require("./services/recipe");

app.use("/recipe", recipeService);

app.get("*", (req, res) => {
  console.log("Hello World");
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Listening on port:", PORT);
});
