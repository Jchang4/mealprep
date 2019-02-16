"use strict";

/*
 * Standardize recipes in the database to have the same schema
 *  - Cooking Time
 *  - Source
 *  - ImageUrl
 */
const P = require("bluebird");
const scriptRunner = require("../src/lib/script-runner");
const inBatches = require("../src/lib/in-batches");

const RecipeModel = require("../src/services/recipe");

scriptRunner(async () => {
  const cursor = RecipeModel.find({}, { timeout: false }).cursor();

  const updateFn = async recipes => {
    const updates = [];

    recipes.forEach(r => {
      updates.push({
        updateOne: {
          filter: { _id: r._id },
          update: {
            imageUrl: r.imgUrl || r.source.imageUrl || r.imageUrl,
            imgUrl: undefined, // remove this prop
            cookingTime: r.cookingTime
              ? {
                  $set: {
                    prep: r.cookingTime.prepTime || r.cookingTime.prep,
                    cook: r.cookingTime.cookTime || r.cookingTime.cook,
                    total: r.cookingTime.totalTime || r.cookingTime.total
                  }
                }
              : undefined,
            "source.imageUrl": undefined // remove this prop
          }
        }
      });
    });

    if (updates.length) {
      await RecipeModel.bulkWrite(updates);
      console.log(`Updated ${updates.length} recipes.`);
    }
  };

  await inBatches({ cursor, updateFn });

  cursor.close();
  return;
});
