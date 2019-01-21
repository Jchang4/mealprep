import callAPI from './callAPI';
import Promise from 'bluebird';

export function getAllRecipes(ingredients, page=1, sort='r') {
  let query = ingredients.join(',');

  return callAPI({
    method: 'POST',
    url: '/recipe',
    data: {
      query,
      sort,
      page,
    }
  })
  .catch(err => {
    console.log('Failed to get all recipes.');
    console.log(err);
    return Promise.reject(err);
  });
}

export function getRecipe(recipeId) {
  return callAPI({
    method: 'GET',
    url: '/recipe/' + recipeId,
  })
  .then(res => res.data)
  .catch(err => {
    console.log('Failed to get recipe by id.');
    console.log(err);
    return Promise.reject(err);
  });
}
