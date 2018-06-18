import { toObject } from '../helpers';
import labelColorMap from './labelColorMap.json';

import {
  postIngredient,
  classifyIngredients,
} from '../../api/nlp';

import {
  ADD_PRE_CLASSIFIED_INGREDIENTS,
  UPDATE_NLP_INGREDIENT,
  REMOVE_NLP_INGREDIENT,
} from './constants';



/**
 * getClassifiedIngredients - get classified ingredients and save to redux/nlp
 *                            in state.nlp.preClassified
 *
 * @param  {Array<String>} ingredients list of ingredients
 * @return {Promise}
 */
export function getClassifiedIngredients(ingredients) {
  return (dispatch, getState) => {
    return classifyIngredients(ingredients)
    .then(clfIngreds => clfIngreds.map(clfToWordLabelMap))
    .then(wordLabelMaps => toObject(wordLabelMaps, "_original"))
    .then(wordLabelMaps => {
      dispatch({
        type: ADD_PRE_CLASSIFIED_INGREDIENTS,
        payload: wordLabelMaps,
      });
      return wordLabelMaps;
    })
    .catch(err => {
      console.log('Failed to add classified ingredients to redux.');
      console.log(err);
    });
  }
}

export function updateIngredient(original, wordIdx, word, label) {
  return (dispatch, getState) => {
    // TODO: validate all params are present (original, quant, name, unit, comments, other)
    dispatch({
      type: UPDATE_NLP_INGREDIENT,
      payload: {
        original,
        [word+wordIdx]: {
          label,
          color: labelColorMap[label]
        },
      },
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



/**
 * From ingredient, get a list of words; remove most punctuation
 * @param  {String} ingredient   original text
 * @return {Array<String>}       array of words
 */
function ingredientToWords(ingredient) {
  const unique = '$%$';
  // Use split,join to replace parentheses
  // and regex to separate it out - lets us keep the parenths as "words"
  let words = ingredient.split('(').join('('+unique);
  words = words.split(')').join(unique+')');
  words = words.split(/\s+|[,!?]+|\$%\$/).filter(Boolean); // remove empty strings
  return words;
}

/**
 * Change classified ingredient object to word map
 *    keep original properties
 * @return {Object} object with words as labels and original properties prefixed with underscore
 */
function clfToWordLabelMap({ original, name, unit, quantity, comment }) {
  let words = ingredientToWords(original);
  let newIng = {
    _words: words,
    _original: original,
    _name: name,
    _unit: unit,
    _quantity: quantity,
    _comment: comment,
  };

  words.forEach((w,idx) => {
    let label = '';

    if (name.indexOf(w) !== -1) {
      label = 'name';
    } else if (unit.indexOf(w) !== -1) {
      label = 'unit';
    } else if (quantity.indexOf(w) !== -1) {
      label = 'quantity';
    } else if (comment.indexOf(w) !== -1) {
      label = 'comment';
    }

    newIng[w+idx] = {label, color: labelColorMap[label]};
  });

  return newIng;
}
