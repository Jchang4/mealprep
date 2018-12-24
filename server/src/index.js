const express = require("express");
const app = express();

// Environment Variables
const { PORT } = require("./config");

app.get("*", () => {
  console.log("Hello World");
});

app.listen(PORT, () => {
  console.log("Listening on port:", PORT);
});
