import callAPI from './callAPI';
import Promise from 'bluebird';

export function postIngredient(data) {
  if (!data.original || !data.name)
    return Promise.reject('Missing parameters: original, name.');

  return callAPI({
    method: 'POST',
    url: '/nlp/ingredients',
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
    data: { ingredients }
  })
  .then(res => res.data)
  .catch(err => {
    console.log('Failed to classify ingredients.');
    return Promise.reject(err);
  });
}
