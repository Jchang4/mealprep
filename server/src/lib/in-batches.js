"use strict";

module.exports = async ({ cursor, updateFn, batchSize = 1000 }) => {
  let currBatch = [];
  let currItem = await cursor.next();

  while (currItem) {
    currBatch.push(currItem);
    if (currBatch.length === batchSize) {
      console.log(`Updating ${currBatch.length} items!`);
      await updateFn(currBatch);
      currBatch = [];
    }
    currItem = await cursor.next();
  }

  if (currBatch.length) {
    console.log(`Updating ${currBatch.length} items!`);
    await updateFn(currBatch);
  }

  return;
};
