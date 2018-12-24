const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("Recipes");
  res.send("Recipes!");
});

module.exports = router;
