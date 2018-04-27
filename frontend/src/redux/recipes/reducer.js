import update from 'immutability-helper';
import { toObject } from '../helpers';

import {
  ADD_N_RECIPES,
  ADD_RECIPE,
  REMOVE_RECIPE,
  UPDATE_RECIPE,
} from './constants';

// const INITIAL_RECIPE_STATE = {}; // food2fork recipes
// ================================================
//                For Development
// ================================================
import ALL_RECIPES from '../../tmp/all-recipes';
let INITIAL_RECIPE_STATE = {};
ALL_RECIPES.forEach(r => {
  INITIAL_RECIPE_STATE[r.recipe_id] = r;
});

function recipeReducer(state=INITIAL_RECIPE_STATE, action) {
  switch (action.type) {

    case ADD_N_RECIPES:
      return update(state, {
        $merge: toObject(action.payload, 'recipe_id')
      });

    case ADD_RECIPE:
      return update(state, {
        [action.payload.recipe_id]: { $set: action.payload }
      });

    case REMOVE_RECIPE:
      return update(state, { $unset: [action.payload] });

    case UPDATE_RECIPE:
      return update(state, {
        [action.payload.recipe_id]: { $merge: action.payload }
      });

    default:
      return state;
  }
}

export default recipeReducer;
