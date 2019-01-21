import update from 'immutability-helper';
import { toArray } from '../helpers';

import {
  ADD_RECIPE_ID_TO_PLANNER,
  REMOVE_RECIPE_ID_FROM_PLANNER,
} from './constants';

const INITIAL_PLANNER_STATE = {
  planner: new Set([]),
};

function recipesOtherReducer(state=INITIAL_PLANNER_STATE, action) {
  switch (action.type) {

    case ADD_RECIPE_ID_TO_PLANNER:
      return update(state, {
        planner: {$add: toArray(action.payload)}
      });

    case REMOVE_RECIPE_ID_FROM_PLANNER:
      return update(state, {
        planner: {$remove: toArray(action.payload)}
      });

    default:
      return state;
  }
}

export default recipesOtherReducer;
