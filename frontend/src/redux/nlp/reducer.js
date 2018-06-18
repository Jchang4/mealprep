
/** NLP Reducer
 *
 * Manage both a list of pre-classified ingredients and the user inputted
 * classification
 */
import update from 'immutability-helper';
import { toArray } from '../helpers';

import {
  ADD_PRE_CLASSIFIED_INGREDIENTS,
  UPDATE_NLP_INGREDIENT,
  REMOVE_NLP_INGREDIENT,
} from './constants';

/**
 * NLP Ingredients Data Structure
 *  [
 *    {
 *        original
 *        quantity
 *        unit
 *        name
 *        comment
 *    },
 *  ]
 */
const INITIAL_NLP_STATE = {};

function nlpReducer(state=INITIAL_NLP_STATE, action) {
  switch (action.type) {

    case ADD_PRE_CLASSIFIED_INGREDIENTS:
      return update(state, {
        $merge: action.payload
      });

    // case ADD_N_NLP_INGREDIENTS:
    //   return update(state, {$merge: toObject(action.payload, 'original')});
    //
    // case ADD_NLP_INGREDIENT:
    // case UPDATE_NLP_INGREDIENT:
    //   return update(state, {
    //     [action.payload.original]: {$set: action.payload}
    //   });

    case REMOVE_NLP_INGREDIENT:
      return update(state, {
        $unset: toArray(action.payload)
      });

    default:
      return state;
  }
}

export default nlpReducer;
