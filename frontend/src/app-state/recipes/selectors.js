import { createSelector } from "reselect";

export const getRecipes = state => state.recipes;

// export const getIsUserLoggedIn = createSelector(
//     getAuthToken,
//     authToken => {
//         return !!authToken
//     }
// )
