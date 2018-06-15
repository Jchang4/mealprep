import Promise from 'bluebird';
// import { toObject, toArray } from '../helpers';
import { getRecipe } from '../../api/f2f';
import {
  postIngredient,
  classifyIngredients,
} from '../../api/nlp';

import {
  ADD_PRE_CLASSIFIED_INGREDIENTS,
  ADD_USER_CLASSIFIED_INGREDIENT,
//   ADD_N_NLP_INGREDIENTS,
//   ADD_NLP_INGREDIENT,
//   REMOVE_NLP_INGREDIENT,
//   UPDATE_NLP_INGREDIENT,
} from './constants';



/**
 * getClassifiedIngredients - get classified ingredients and save to redux/nlp
 *
 * @param  {Array<String>} ingredients list of ingredients
 * @return {Promise}
 */
export function getClassifiedIngredients(ingredients) {
  return (dispatch, getState) => {
    return classifyIngredients(ingredients)
    .then(classifiedIngreds => {
      dispatch({
        type: ADD_PRE_CLASSIFIED_INGREDIENTS,
        payload: classifiedIngreds,
      });
      return classifiedIngreds;
    })
    .catch(err => {
      console.log('Failed to add classified ingredients to redux.');
      console.log(err);
    });
  }
}


/**
 * _validateUserClassifiedIngredient - validate user classified ingredient has
 *                                       original and name
 *                                     validate "                             "
 *                                       valid quantity, unit, and comment
 *
 * @param  {Object} clfIngredient
 * @return {Boolean} Return true if clfIngredient is valid, else return false
 */
function _validateUserClassifiedIngredient(clfIngredient) {
  // Must have 'original' and 'name'
  if (!clfIngredient.original || !clfIngredient.name)
    return false;

  // 'Quantity' must be a float
  if (clfIngredient.quantity && !Number(clfIngredient.quantity))
    return false;

  return true;
}

/**
 * addUserClassifiedIngredient - add user-classified ingredient
 *
 * classified ingredient must be of the form:
 *  {
 *      original    required
 *      name        required
 *      quantity    optional
 *      unit        optional
 *      comment     optional
 *  }
 *
 * @param  {Object} clfIngredient classified ingredient
 * @return {Promise}
 */
export function addUserClassifiedIngredient(clfIngredient) {
  return (dispatch, getState) => {
    return Promise.resolve()
    .then(() => {
      // Validate clf ingredient
      let isValid = _validateUserClassifiedIngredient(clfIngredient);

      if (isValid) {
        dispatch({
          type: ADD_USER_CLASSIFIED_INGREDIENT,
          payload: clfIngredient,
        });
        return clfIngredient
      }

      return Promise.reject('Invalid user classified ingredient.');
    });
  }
}


// function ingredientToWords(ingr) {
//   let unique = '$%$'
//   // Use split,join to replace parentheses
//   // and regex to separate it out - lets us keep the parenths as "words"
//   let words = ingr.split('(').join('('+unique);
//   words = words.split(')').join(unique+')');
//   words = words.split(/\s+|[,!?]+|\$%\$/).filter(Boolean);
//   return words;
// }


// export function updateIngredient(ingredient) {
//   return (dispatch, getState) => {
//     // TODO: validate all params are present (original, quant, name, unit, comments, other)
//     dispatch({
//       type: UPDATE_NLP_INGREDIENT,
//       payload: ingredient,
//     });
//   }
// }
//
// export function removeIngredient(originalText) {
//   return (dispatch, getState) => {
//     dispatch({
//       type: REMOVE_NLP_INGREDIENT,
//       payload: originalText,
//     });
//   }
// }
