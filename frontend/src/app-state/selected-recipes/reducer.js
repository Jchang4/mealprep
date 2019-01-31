import update from "immutability-helper";

import { SELECT_RECIPE_BY_ID, REMOVE_SELECTED_RECIPE_BY_ID } from "./constants";

const INITIAL_RECIPE_STATE = {};

function selectedRecipesReducer(state = INITIAL_RECIPE_STATE, action) {
  switch (action.type) {
    case SELECT_RECIPE_BY_ID:
      return update(state, {
        $merge: {
          [action.payload]: true
        }
      });

    case REMOVE_SELECTED_RECIPE_BY_ID:
      return update(state, {
        $unset: [action.payload]
      });

    default:
      return state;
  }
}

export default selectedRecipesReducer;
