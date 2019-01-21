import callAPI from './callAPI';
import { getRecipe } from './f2f';
import Promise from 'bluebird';

export function postIngredient(data) {
  if (!data.original || !data.name)
    return Promise.reject('Missing parameters: original, name.');

  return callAPI({
    method: 'POST',
    url: '/nlp',
    data: {
      force: true,
      ...data
    },
  })
  .then(res => res.data)
  .catch(err => {
    console.log('Failed to add NLP Ingredient.');
    return Promise.reject(err);
  });
}

export function classifyIngredients(ingredients) {
  if (!ingredients)
    return Promise.reject('Must provide an array of ingredients.');

  return callAPI({
    method: 'POST',
    url: '/nlp/classify',
    data: { ingredients },
  })
  .then(res => res.ingredients)
  .catch(err => {
    console.log('Failed to classify ingredients.');
    return Promise.reject(err);
  });
}



/**
 * getIngredients - get ingredients from recipes
 *
 * @param  {type} recipeIds recipes to get ingredients from
 * @return {Array<String} list of ingredients
 */
export function getIngredients(recipeIds) {
  if (!Array.isArray(recipeIds))
    return Promise.reject('Recipe Ids must be an array of recipe ids.');

  return Promise.map(recipeIds, rId => getRecipe(rId))
  .catch(err => {
    console.log('Failed to add some ingredients.');
    console.log(err);
  })
  .then(recipes => recipes.map(r => r.ingredients))
  .then(ingreds => ingreds.reduce((a,b) => a.concat(b), []))
  .catch(err => {
    console.log('Failed to get ingredients.');
    return Promise.reject(err);
  });
}
