/**
 * https://www.edamam.com/
 * https://developer.edamam.com/edamam-docs-recipe-api
 */
const axios = require('axios');
const API_CREDS = require('./credentials');
// const { generateRandomCombos, getRandFromList } = require('../helpers');

const BASE_URL = `https://api.edamam.com/search?app_id=${API_CREDS.id}&app_key=${API_CREDS.key}&`;
// // Edamam Options
// const EDAMAM_OPTIONS = {
//   diet: ['balanced', 'high-protein', 'high-fiber', 'low-fat', 'low-carb', 'low-sodium'],
// };

class Edamam {
  /**
   * search - GET request to edamam.com's recipe api
   *
   * The parameters from,to allow for paging
   *
   * @param  {String}  searchQuery Query to search. For example, 'chicken,spinach'
   * @param  {Integer} from        start index
   * @param  {Integer} to          end index
   * @return {Promise}             Edamam search result
   */
  search(query, from=0, to=5, otherSearchParams='') {
    let finalUrl = BASE_URL + `q=${query}&from=${from}&to=${to}` + otherSearchParams;
    console.log(finalUrl);

    // return axios.get(finalUrl)
    // .then(res => res.data)
    // .catch(err => {
    //   console.log('Edamam failed to search for recipes.');
    //   console.log(err);
    // });
    // .catch(err => {
    //   console.log('Edamam failed to search for recipes using reduced search.');
    //   console.log('The query is probably wrong.');
    //   console.log(err);
    // });
  }

  getCalorieRangeQuery(lower, upper) {
    let result = '';

    if (lower)
      result += 'gte ' + lower;
    if (upper) {
      if (result.length > 0)
        result += ',';
      result += 'lte ' + upper;
    }

    return 'calories=' + result;
  }
}


// let ingredients = [
//   'chicken',
//   'spinach',
//   'potatos',
// ];
let e = new Edamam();
e.search('chicken')
// .then(data => console.log(data))
// let combos = e.generateRandomCombos(10, {
//   'meats': ['chicken', 'salmon', 'pork'],
//   'veggies': {
//     numPerDish: 4,
//     items: ['spinach', 'tomatoes', 'cucumber', 'garlic']
//   },
// })
// let s = e.search([
//   ingredients.join(','),
//   e.getCalorieRangeQuery(1, 100)].join('&'),
//   0,
//   10
// ).then(res => {
//   console.log('\n\tSUCCESS! WOOO');
//   console.log(res);
// })
//
//
// // export default Edamam;
