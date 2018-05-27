import nlpReducer from './reducer';
import * as actions from './actions';
import * as constants from './constants';
import { classifyIngredients } from '../../api/nlp';

const INGREDIENTS = [
  '1 whole Large (or 2 Small) Onions',
  '2 sticks Butter (lots And Lots Of Butter)',
  '2 pounds (to 3 Pounds) Cube Steak (tenderized Round Steak That\'s Been Extra Tenderized)',
  'Lawry\'s Seasoned Salt (or Similar Seasoned Salt)',
  '1/2 cup (approximately) Worcestershire Sauce',
  'Tabasco Sauce, To Taste',
  '4 whole French/deli Rolls (earthgrains Are Best!)',
  '3 pounds Cube Steak (tenderized Round Steak That\'s Been Extra Tenderized)',
  '1-1/2 cup Whole Milk, Plus Up To 2 Cups For Gravy',
  '2 whole Large Eggs',
  '3 cups All-purpose Flour',
  'Seasoned Salt',
  '1/4 teaspoon Cayenne',
  'LOTS Of Black Pepper. Lots.',
  'Canola Oil, For Frying',
  'Salt And Pepper, For Both Meat And Gravy',
  '5 pounds Russet Or Yukon Gold Potatoes',
  '3/4 cups Butter',
  '1 package (8 Oz.) Cream Cheese, Softened',
  '1/2 cup (to 3/4 Cups) Half-and-Half',
  '1/2 teaspoon (to 1 Teaspoon) Lawry\'s Seasoned Salt',
  '1/2 teaspoon (to 1 Teaspoon) Black Pepper',
  '3 pounds Cube Steak (round Steak That\'s Been Extra Tenderized)',
  '1 cup All-purpose Flour',
  '1 teaspoon Seasoned Salt',
  '3 teaspoons Ground Black Pepper, Or To Taste',
  'Salt, For Seasoning Meat',
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
  'Shaved Parmesan Cheese',
  '1/2 cup Good Steak Sauce (more If Desired)',
];

const INITIAL_STATE = {
  preClassified: [],
  userClassified: {},
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


describe('add user-classified ingredients', () => {
  test('should add user-classified ingredients to state.userClassified', async () => {
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
        [clfIngred.name]: clfIngred
      }
    });
  });

  test('should add user-classified ingredient if not already in state.userClassified', async () => {

  });
});
