import nlpReducer from './reducer';
import * as actions from './actions';
import * as constants from './constants';
import { classifyIngredients } from '../../api/nlp';

const INGREDIENTS = [
  '2 whole Large Eggs',
  '1/4 teaspoon Cayenne',
  '3/4 cups Butter',
  '1 whole Large (or 2 Small) Onions',
  '2 sticks Butter (lots And Lots Of Butter)',
  '2 pounds (to 3 Pounds) Cube Steak (tenderized Round Steak That\'s Been Extra Tenderized)',
  'Lawry\'s Seasoned Salt (or Similar Seasoned Salt)',
  '1/2 cup (approximately) Worcestershire Sauce',
  '4 whole French/deli Rolls (earthgrains Are Best!)',
  '3 pounds Cube Steak (tenderized Round Steak That\'s Been Extra Tenderized)',
  '1-1/2 cup Whole Milk, Plus Up To 2 Cups For Gravy',
  '3 cups All-purpose Flour',
  '5 pounds Russet Or Yukon Gold Potatoes',
  '1 package (8 Oz.) Cream Cheese, Softened',
  '1/2 cup (to 3/4 Cups) Half-and-Half',
  '1/2 teaspoon (to 1 Teaspoon) Lawry\'s Seasoned Salt',
  '1/2 teaspoon (to 1 Teaspoon) Black Pepper',
  '3 pounds Cube Steak (round Steak That\'s Been Extra Tenderized)',
  '1 cup All-purpose Flour',
  '1 teaspoon Seasoned Salt',
  '3 teaspoons Ground Black Pepper, Or To Taste',
  '1/2 cup Canola Oil (more If Needed)',
  '2 Tablespoons Butter',
  '1 teaspoon (SCANT) Active Dry Yeast',
  '3/4 cups Warm Water',
  '2 cups All-purpose Flour',
  '3/4 teaspoons Kosher Salt',
  '3 Tablespoons Olive Oil',
  '1 whole Recipe Pizza Crust',
  '1 whole Skirt Steak Or Flank Steak',
  'Salt And Pepper, to taste',
  '2 whole Red Onions, Sliced Thin',
  '3 Tablespoons Butter',
  '4 Tablespoons Balsamic Vinegar',
  '1/2 teaspoon Worcestershire Sauce',
  '2 cups Marinara Sauce',
  '12 ounces, weight Fresh Mozzarella Cheese, Sliced Thin',
  '1/2 cup Good Steak Sauce (more If Desired)',
];

const INITIAL_STATE = {
  preClassified: {},
};
var state;

beforeEach(() => {
  state = nlpReducer(INITIAL_STATE, {});
  return;
});

describe('add pre-classified ingredients', () => {
  test('should add classified ingredients to state.preClassified', async () => {
    let clfIngreds = await actions.getClassifiedIngredients(INGREDIENTS.slice(0,3))(()=>{},()=>{});
    let action = {
      type: constants.ADD_PRE_CLASSIFIED_INGREDIENTS,
      payload: clfIngreds
    };
    state = nlpReducer(state, action);
    expect(state).toEqual({
      ...INITIAL_STATE,
      preClassified: clfIngreds,
    });
  });

  // Since we're using the same 3 ingredients, its easy to test
  test('should create single array of state.preClassified and new classified ingredients', async () => {
    let clfIngreds = await actions.getClassifiedIngredients(INGREDIENTS.slice(0,3))(()=>{},()=>{});
    let action = {
      type: constants.ADD_PRE_CLASSIFIED_INGREDIENTS,
      payload: clfIngreds
    };
    state = nlpReducer(state, action);
    state = nlpReducer(state, action);
    expect(state).toEqual({
      ...INITIAL_STATE,
      preClassified: [
        ...clfIngreds,
        ...clfIngreds,
      ],
    });
  });
});


describe('add pre-classified ingredients', () => {
  test('should add pre-classified ingredients to state.preClassified', async () => {
    expect.assertions(1);
    let userClfIngred = {
      original: '2 whole Large Eggs',
      name: 'Eggs',
      quantity: 2,
      unit: 'whole',
      comment: 'Large'
    };
    let clfIngred = await actions.addUserClassifiedIngredient(userClfIngred)(()=>{},()=>{});
    let action = {
      type: constants.ADD_USER_CLASSIFIED_INGREDIENT,
      payload: clfIngred
    };
    state = nlpReducer(state, action);
    expect(state).toEqual({
      ...INITIAL_STATE,
      userClassified: {
        [clfIngred.original]: clfIngred
      }
    });
  });

  test('should not add user-classified ingredients with same "original" prop', async () => {
    expect.assertions(2);
    let userClfIngred = {
      original: '2 whole Large Eggs',
      name: 'Eggs',
      quantity: 2,
      unit: 'whole',
      comment: 'Large'
    };
    let clfIngred = await actions.addUserClassifiedIngredient(userClfIngred)(()=>{},()=>{});
    let action = {
      type: constants.ADD_USER_CLASSIFIED_INGREDIENT,
      payload: clfIngred
    };
    state = nlpReducer(state, action);
    state = nlpReducer(state, action);
    // should only show 1 since they have the same 'original'
    expect(Object.keys(state.userClassified).length).toEqual(1);
    expect(state).toEqual({
      ...INITIAL_STATE,
      userClassified: {
        [clfIngred.original]: clfIngred
      }
    });
  });

  test('should add user-classified ingredients by "original" prop', async () => {
    // ------- Add another CLF Ingred -------------------------
    let userClfIngred1 = {
      original: '2 whole Large Eggs',
      name: 'Eggs',
      quantity: 2,
      unit: 'whole',
      comment: 'Large'
    };
    let userClfIngred2 = {
      original: '1 tablespoon of peanut butter',
      name: 'peanut butter',
      quantity: 1,
      unit: 'tablespoon',
      comment: 'of'
    };
    // Ensure both can be added through actions
    let clfIngred1 = await actions.addUserClassifiedIngredient(userClfIngred1)(()=>{},()=>{});
    let clfIngred2 = await actions.addUserClassifiedIngredient(userClfIngred2)(()=>{},()=>{});
    let action = {
      type: constants.ADD_USER_CLASSIFIED_INGREDIENT,
      payload: clfIngred1
    };
    state = nlpReducer(state, action);
    action.payload = clfIngred2
    state = nlpReducer(state, action);
    expect(Object.keys(state.userClassified).length).toEqual(2);
    expect(state).toEqual({
      ...INITIAL_STATE,
      userClassified: {
        [clfIngred1.original]: clfIngred1,
        [clfIngred2.original]: clfIngred2,
      }
    });
  });
});
