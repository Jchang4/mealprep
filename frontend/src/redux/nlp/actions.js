import Promise from 'bluebird';
// import { toObject, toArray } from '../helpers';
import { getRecipe } from '../../api/f2f';
import {
  postIngredient,
  classifyIngredients,
} from '../../api/nlp';

import {
  ADD_N_NLP_INGREDIENTS,
  ADD_NLP_INGREDIENT,
  REMOVE_NLP_INGREDIENT,
  UPDATE_NLP_INGREDIENT,
} from './constants';


function ingredientToWords(ingr) {
  let unique = '$%$'
  // Use split,join to replace parentheses
  // and regex to separate it out - lets us keep the parenths as "words"
  let words = ingr.split('(').join('('+unique);
  words = words.split(')').join(unique+')');
  words = words.split(/\s+|[,!?]+|\$%\$/).filter(Boolean);
  return words;
}

export function preClassifyIngredients(recipeIds) {
  return (dispatch, getState) => {
    return Promise.map(recipeIds, (id) => getRecipe(id))
    .then(recipes => {
      console.log(recipes);
      return recipes;
    })
    .then(recipes => recipes.map(r => r.ingredients)) // Get ingredients
    .then(ingredients => ingredients.reduce((acc,i) => acc.concat(i), [])) // Turn into single array
    .then(ingredients => classifyIngredients(ingredients)) // pre-classify
    .then(ingredients => ingredients.map((ingr,i) => {
      return {
        ...ingr,
        words: ingredientToWords(ingr.original),
      };
    }))
    .then(classifiedIngredients => { // add to redux
      dispatch({
        type: ADD_N_NLP_INGREDIENTS,
        payload: classifiedIngredients,
      });
    })
    .catch(err => {
      console.log('Failed to pre-classify ingredients.');
      console.log(err);
    });
  }
}

export function updateIngredient(ingredient) {
  return (dispatch, getState) => {
    // TODO: validate all params are present (original, quant, name, unit, comments, other)
    dispatch({
      type: UPDATE_NLP_INGREDIENT,
      payload: ingredient,
    });
  }
}

export function removeIngredient(originalText) {
  return (dispatch, getState) => {
    dispatch({
      type: REMOVE_NLP_INGREDIENT,
      payload: originalText,
    });
  }
}
