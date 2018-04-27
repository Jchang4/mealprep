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


export function preClassifyIngredients(recipeIds) {
  return (dispatch, getState) => {
    return Promise.map(recipeIds, (id) => getRecipe(id))
    .then(recipes => recipes.map(r => r.ingredients)) // Get ingredients
    .then(ingredients => ingredients.reduce((acc,i) => acc.concat(i), [])) // Turn into single array
    .then(ingredients => classifyIngredients(ingredients)) // pre-classify
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

export function addClassifiedIngredient() {
  return (dispatch, getState) => {

  }
}

export function updateClassifiedIngredient(ingredient) {
  return (dispatch, getState) => {
    // TODO: validate all params are present (original, quant, name, unit, comments, other)
    dispatch({
      type: UPDATE_NLP_INGREDIENT,
      payload: ingredient
    });
  }
}

export function removeIngredient() {
  return (dispatch, getState) => {

  }
}
