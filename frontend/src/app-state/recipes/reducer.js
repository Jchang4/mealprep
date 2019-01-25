import update from "immutability-helper";
import { toObject } from "../helpers";

import {
  ADD_N_RECIPES,
  ADD_RECIPE,
  REMOVE_RECIPE,
  UPDATE_RECIPE,
  CLEAR_RECIPES
} from "./constants";

const INITIAL_RECIPE_STATE = {};

function listOfRecipesToObject(recipes) {
  return recipes.reduce(
    (acc, r) =>
      Object.assign(acc, {
        [r.source.recipeUrl]: r
      }),
    {}
  );
}

function recipeReducer(state = INITIAL_RECIPE_STATE, action) {
  switch (action.type) {
    case ADD_N_RECIPES:
      return update(state, {
        $merge: listOfRecipesToObject(action.payload)
      });

    case ADD_RECIPE:
      return update(state, {
        [action.payload.source.recipeUrl]: { $set: action.payload }
      });

    case REMOVE_RECIPE:
      // Remove by url
      return update(state, { $unset: [action.payload] });

    case UPDATE_RECIPE:
      return update(state, {
        [action.payload.source.recipeUrl]: { $merge: action.payload }
      });

    case CLEAR_RECIPES:
      return update(state, {
        $set: {}
      });

    default:
      return state;
  }
}

export default recipeReducer;
