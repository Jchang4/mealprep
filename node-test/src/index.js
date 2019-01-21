const AllRecipeScraper = require("./scrapers/all-recipe");

/**
 * Get the HTML page from any URL
 */
// async function getHtml(url) {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(url);
//   const html = await page.content();

//   await browser.close();

//   return html;
// }

(async () => {
  const a = new AllRecipeScraper();
  const recipeUrls = await a.getRecipeUrlsFromIngredients([
    "steak",
    "chimichurri"
  ]);
  console.log(recipeUrls);
  const recipes = await a.staggerNGetRecipesDetails(recipeUrls.slice(0, 2));
  console.log(recipes);
})();
