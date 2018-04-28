import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Promise from 'bluebird';
import shuffle from '../../assets/js/shuffle';
import { getAllRecipes, getRecipe } from '../../api/f2f';
import { /*postIngredient,*/ classifyIngredients } from '../../api/nlp';

// Components
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import SearchBar from '../../components/SearchBar';
import LabelSelector from './components/LabelSelector';
import LineClassifier from './components/LineClassifier';

const propTypes = {
  addRecipe: PropTypes.func.isRequired,
  addRecipeDetails: PropTypes.func.isRequired,
};
const defaultProps = {};



const LABELS = [
  {name: 'quantity', color: '#cfc'},
  {name: 'unit', color: '#ccf'},
  {name: 'name', color: '#fcc'},
  // {name: 'comment', color: '#ffc'},
  // {name: 'other', color: '#c9ffff'},
];

class NLPIngredients extends Component {

  state = {
    loading: false,
    numLines: 6,

    currLabel: '',
    currColor: '',
    ingredients: [],
  }

  // FOR DEVELOPMENT
  componentDidMount() {
    const DEV_INGREDS = [
      "4 1/2 cups (20.25 ounces) unbleached high-gluten, bread, or all-purpose flour, chilled",
      "1 3/4 (.44 ounce) teaspoons salt",
      "1 teaspoon (.11 ounce) instant yeast",
      "1/4 cup (2 ounces) olive oil (optional) oil",
      "1 3/4 cups (14 ounces) water, ice cold (40F)",
    ];

    // Get Recipe Ingreidents, format, and add to state
    classifyIngredients(DEV_INGREDS)
    .then(formattedIngredients => this.classifiedToState(formattedIngredients))
    .then(ingr => this.setState({ ingredients: ingr }))
    .catch(err => {
      console.log('Faield to get formatted ingredients in componentDidMount.');
      console.log(err);
    });
  }

  getRandNum(min, max) {
    return Math.floor(Math.random() * (max-min) + min);
  }

  ingredientToWords(ingr) {
    let unique = '$%$'
    // Use split,join to replace parentheses
    // And regex to separate it out - lets us keep the parenths as "words"
    let words = ingr.split('(').join('('+unique);
    words = words.split(')').join(unique+')');
    words = words.split(/\s+|[,!?]+|\$%\$/).filter(Boolean);
    return words;
  }

  singularize(word) {
    // A poor replacement for the pattern.en singularize function, but ok for now.

    const units = {
      "bottles": "bottle",
      "bulbs": "bulb",
      "bunches": "bunch",
      "cans": "can",
      "cloves": "clove",
      "cups": "cup",
      "dashes": "dash",
      "ears": "ear",
      "fillets": "fillet",
      "grams": "gram",
      "heads": "head",
      "ounces": "ounce",
      "packages": "package",
      "pieces": "piece",
      "pinches": "pinch",
      "pints": "pint",
      "pounds": "pound",
      "quarts": "quart",
      "slices": "slice",
      "sprigs": "sprig",
      "stalks": "stalk",
      "sticks": "stick",
      "strips": "strip",
      "tablespoons": "tablespoon",
      "teaspoons": "teaspoon",
    }

    if (units[word]) {
      return units[word];
    }
    return word
  }

  fractions_to_floats(number) {
    // Replace dashes with space
    // let newLine = number.replace('-', ' ');
    // Change all fractions to floats
    let has_num_and_fraction = /(\d+)\s+(\d+)\/(\d+)/; // i.e. 1 1/8 => 1.13
    let has_one_fraction = /(\d+)\/(\d+)/;          // i.e. 1/2   => 1.5
    let one_number = /\d+/;                        // i.e. 16, 2 => 16.0, 2.0

    if (has_num_and_fraction.test(number)) {
      let match = number.match(has_num_and_fraction);
      return (Number(match[1]) + (match[2] / match[3])).toFixed(2);
    }
    else if (has_one_fraction.test(number)) {
      let match = number.match(has_one_fraction);
      return (match[1] / match[2]).toFixed(2);
    }
    else if (one_number.test(number)) {
      return number + '.0';
    }

    if (!isNaN(Number(number)))
      return Number(number);
    throw new Error("Did not provide a number.");
  }

  isPunctuation(str) {
    // return boolean
    return !!str.match(/[!?.,()]/)
  }

  handleChangeNumLines(newVal) {
    this.setState({ numLines: newVal });
  }

  /**
   * classifiedToState - change data structure to match component's state
   *
   *
   * Component's state.ingredients Data Structure
   *    {
   *        original: original ingredient text - i.e. '2 large chicken breasts',
   *        [word+idx]: LABEL,  (index of word in sentence)
   *           ...
   *    }
   *
   * Example:
   *    {
   *        original: '2 large chicken breasts',
   *        '20': 'QUANTITY',
   *        'large1': 'COMMENT',
   *        'chicken2': 'NAME',
   *        'breasts3': 'NAME',
   *    }
   *
   * @param  {type} classifiedIngredients list of classified ingredients
   *     Ingredients are in the form:
   *        {
   *            comment : "unbleached or all-purpose chilled",
   *            name: "high-gluten bread flour",
   *            original: "4 1/2 cups (20.25 ounces) unbleached high-gluten, bread, or all-purpose flour, chilled",
   *            other: "1/2 20.25 ounces",
   *            quantity: "4",
   *            unit : "cups",
   *        }
   *
   * @return {type}
   */
  classifiedToState(classifiedIngredients) {
    let stateIngredients = [];

    for (let i=0; i < classifiedIngredients.length; i++) {
      let classIngr = classifiedIngredients[i];
      let originalArr = this.ingredientToWords(classIngr.original);
      let stateIngr = {
        original: classIngr.original,
        words: originalArr,
      };

      // Create word:label map, i.e. { 1: quantity, chicken: name, breast: name}
      Object.keys(classIngr).forEach(label => {
        if (label !== 'original') {
          let labelVals = classIngr[label].split(' ');
          let color = LABELS.find(l => l.name === label);
          labelVals.forEach(w => {
            let idx = originalArr.findIndex(o => o === w);
            idx = (idx > -1) ? idx : '';
            stateIngr[w+idx] = {
              color: (color && color.color) ? color.color : '',
              label: label || 'other',
            };
          });
        }
      });

      // console.log(classIngr);
      // console.log(stateIngr);
      stateIngredients.push(stateIngr);
    }

    return stateIngredients;
  }

  handleSearchClick(query) {
    // Ex query: chicken,pasta, oregeno
    // Turn query into an array
    // spaces, symbols, symbols+spaces
    let q = this.ingredientToWords(query);
    let page = this.getRandNum(1,4); // get random page for variety
    console.log('query:', q);
    return getAllRecipes(q, page)
    // Pick 3 random recipes
    .then(recipes => {
      let r = shuffle(recipes);
      return r.slice(0,4);
    })
    // Get Ingredients
    .then(recipes => Promise.map(recipes, (r) => getRecipe(r.recipe_id)))
    .then(recipes => recipes.reduce((a,b) => a.concat(b.ingredients), [])) // return list of ingredients
    // Classify Ingredients
    .then(ingredients => classifyIngredients(ingredients))
    // Change to proper data structure
    // See function
    .then(classifiedIngredients => this.classifiedToState(classifiedIngredients))
    // Set State
    .then(ingredients => {
      console.log('Formatted (Preview):');
      console.log(ingredients.slice(0,3));
      this.setState({
        ingredients: shuffle(ingredients),
        loading: false,
      });
    })
    .catch(err => {
      this.setState({loading: false});
      console.log('Failed to search for ingredients.');
      console.log(err);
    });
  }

  handleLabelSelect(label, color) {
    const { currLabel } = this.state;

    if (label === currLabel) {
      this.setState({ currLabel: '', currColor: '', });
    } else {
      this.setState({ currLabel: label, currColor: color });
    }
  }

  handleWordClick(ingredientIdx, wordIdx, word) {
    const { currLabel, currColor, ingredients } = this.state;
    let newIngreds = ingredients.slice();
    let ingr = ingredients[ingredientIdx];
    let w = ingr[word+wordIdx];

    // Remove label
    if (w.label === currLabel) {
      newIngreds[ingredientIdx] = {
        ...newIngreds[ingredientIdx],
        [word+wordIdx]: { label: '', color: '' },
      }
    }
    // Add label
    else {
      newIngreds[ingredientIdx] = {
        ...newIngreds[ingredientIdx],
        [word+wordIdx]: { label: currLabel, color: currColor },
      }
    }
    this.setState({ ingredients: newIngreds });
  }

  handleDeleteLine(lineIdx) {
    const { ingredients } = this.state;
    this.setState({
      ingredients: ingredients.filter((_,idx) => idx !== lineIdx)
    });
  }

  // ---------------------------------------------------------------------

  handleSubmit() {
    const { numLines, ingredients } = this.state;
    const ingreds = ingredients.slice(0, numLines);

    // Format Data
    let data = ingreds.map((ingr,i) => {
      // NOTE: default unlabeled words as comment
      let d = {
        original: ingr.original,
        name: '',
        quantity: '',
        unit: '',
        comment: '',
      };
      console.log(ingr);
      // Change from word:label to label:words
      ingr.words.forEach((w,i) => {
        if (!this.isPunctuation(w)) {
          let label = ingr[w+i].label;
          if (label) {
            d[label] += (w + ' ')
          } else { // default to comment
            d.comment += (w + ' ')
          }
        }
      });

      // Remove spaces on either side of string
      Object.keys(d).forEach(k => {
        d[k] = d[k].trim();
      });

      // Turn quantity into float
      if (d.quantity) {
        d.quantity = this.fractions_to_floats(d.quantity)
      }

      // Singularize unit
      if (d.unit) {
        d.unit = this.singularize(d.unit);
      }

      return d;
    });

    // Send to Server
    console.log(data);
    // return Promise.map(data, (d) => postIngredient(d))
    // .then(() => {
    //   // Remove ingredients
    //   this.setState({
    //     ingredients: ingredients.slice(numLines) // [numLines : end]
    //   });
    //
    //   console.log('Added', data.length, 'NLP ingredients to database.');
    // })
    // .catch(err => {
    //   console.log('Failed to send some ingredients to the server.');
    //   console.log(err);
    // })
  }

  render() {
    const {
      numLines,
      ingredients,
      loading,
    } = this.state;

    const ingreds = ingredients.slice(0, (numLines || 5));

    return (
      <div style={{position: 'relative'}}>

        {/* Position Fixed: Labels & Circles  */}
        <div style={{
          position: 'fixed',
          left: 0,
          top: '35%',
        }}>
          <LabelSelector
            selectedLabel={this.state.currLabel}
            labels={LABELS}
            onLabelSelect={(label, color) => this.handleLabelSelect(label, color)}
          />
        </div>

        <div className="flex-center" style={{margin: '1rem auto'}}>
          <SearchBar
            style={{maxWidth: '500px'}}
            btnLabel="Get Ingredients"
            onEnter={(search) => this.handleSearchClick(search)}
          />
          <TextField
            style={{width: '90px', marginLeft: '3rem'}}
            floatingLabelText="num. lines"
            hintText="enter a number"
            type="number"
            value={numLines}
            onChange={(e,newVal) => this.handleChangeNumLines(newVal)}
          />
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div
            className="flex-center"
            style={{ height: '45vh', alignItems: 'center' }}
          >
            <CircularProgress size={50} thickness={6} />
          </div>
        )}

        {/* Lines */}
        {!loading && (
          <div style={{maxWidth: '800px', margin: '0 auto'}}>
            {ingreds.map((ingr,i) => (
              <div key={i}>
                <LineClassifier
                  ingredient={ingr}
                  hightlight={this.state.currColor}
                  onWordClick={(wordIdx, word) => this.handleWordClick(i, wordIdx, word)}
                  onDeleteClick={() => this.handleDeleteLine(i)}
                />
                <hr style={{width: '35%', margin: '0.25rem auto'}} />
              </div>
            ))}
          </div>
        )}

        {/* Submit Button */}
        <div
          className="flex-center"
          style={{
            justifyContent: 'flex-end',
            width: '90%',
            maxWidth: '600px',
            margin: '1.5rem auto 0 auto',
          }}
        >
          <RaisedButton
            label="Submit"
            secondary={true}
            disabled={(ingredients.length === 0) ? true : false}
            onClick={() => this.handleSubmit()}
          />
        </div>
      </div>
    );
  }
}

NLPIngredients.propTypes = propTypes;
NLPIngredients.defaultProps = defaultProps;

export default NLPIngredients;
