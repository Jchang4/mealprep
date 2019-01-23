import update from "immutability-helper";
import { toObject } from "../helpers";

import {
  NEW_RECIPES,
  ADD_RECIPE,
  REMOVE_RECIPE,
  UPDATE_RECIPE
} from "./constants";

const INITIAL_RECIPE_STATE = {};

function recipeReducer(state = INITIAL_RECIPE_STATE, action) {
  switch (action.type) {
    case NEW_RECIPES:
      return update(state, {
        $merge: action.payload.reduce(
          (obj, recipe) =>
            Object.assign(obj, { [recipe.source.recipeUrl]: recipe }),
          {}
        )
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

    default:
      return state;
  }
}

export default recipeReducer;
