import axios from "axios";

const SERVER_URL = process.env.SERVER_URL || "http://localhost:5000";

export async function getRecipesByIngredientsFromApi({
  ingredients,
  numResults,
  offset
}) {
  const queryString = ingredients.map(i => `i=${i}`).join("&");
  const res = await axios.get(
    `${SERVER_URL}/recipeApi?${queryString}&r=${numResults}&offset=${offset}`
  );
  return res.data.recipes;
}
