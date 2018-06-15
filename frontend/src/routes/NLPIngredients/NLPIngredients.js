/**
 * TODO:
 *      - add random paging, so we always get random ingreds
 *      - move reused code
 *
 * Classifying Ingreds:
 *      - delete classified ingred after classifying
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { recipeQueryToArray } from '../../redux/helpers';

// Components
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import SearchBar from '../../components/SearchBar';
import LabelSelector from './components/LabelSelector';
import LineClassifier from './components/LineClassifier';


const LABELS = [
  {name: 'quantity', color: '#cfc'},
  {name: 'unit', color: '#ccf'},
  {name: 'name', color: '#fcc'},
  // {name: 'comment', color: '#ffc'},
  // {name: 'other', color: '#c9ffff'},
];

const propTypes = {
  recipes: PropTypes.object.isRequired,
  preClassifiedIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  getRecipes: PropTypes.func.isRequired,
  getIngredients: PropTypes.func.isRequired,
  getClassifiedIngredients: PropTypes.func.isRequired,
}

class NLPIngredients extends Component {

  state = {
    numLines: 7,
    currLabel: '',
    currColor: '',
    loading: false,
  }

  handleLabelSelect(label, color) {
    if (label !== this.state.currLabel) {
      this.setState({ currLabel: label, currColor: color });
    } else {
      this.setState({ currLabel: '', currColor: '' });
    }
  }

  /* handleSearchClick
        Search for recipes, get ingredients, set ingredients to state.nlp
  */
  handleSearchClick(query) {
    const { getIngredients, getClassifiedIngredients } = this.props;

    // Ex query: chicken,pasta, oregeno
    let q = recipeQueryToArray(query);

    console.log('query:', q);

    return getIngredients(q, 3)
    // Pre classify and add to Redux
    .then(ingredients => {
      console.log('ingredients:');
      console.log(ingredients);
      return getClassifiedIngredients(ingredients);
    })
    .then(clfIngreds => {
      console.log('classified ingredients: showing 10');
      console.log(clfIngreds.slice(0,10));
      this.setState({ loading: false });
    })
    .catch(err => {
      this.setState({ loading: false });
      console.log('Failed to search for ingredients.');
      console.log(err);
    });
  }

  /* Change number of lines to classify at a time */
  handleChangeNumLines(numLines) {
    this.setState({ numLines });
  }

  // handleWordClick() {}
  // handleDeleteLine(key) {
  //   this.props.removeIngredient(key);
  // }

  render() {
    const { preClassifiedIngredients } = this.props;
    const ingreds = preClassifiedIngredients.slice(0, this.state.numLines);

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

        {/* Search bar and number of lines */}
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
            value={this.state.numLines}
            onChange={(e,newVal) => this.handleChangeNumLines(newVal)}
          />
        </div>

        {/* <div style={{maxWidth: '800px', margin: '0 auto'}}>
          {ingreds.map((ingr,i) => (
            <div key={i}>
              <LineClassifier
                ingredient={ingr}
                hightlight={this.state.currColor}
                onWordClick={(wordIdx, word) => this.handleWordClick(i, wordIdx, word)}
                onDeleteClick={() => this.handleDeleteLine(ingr.original)}
              />
              <hr style={{width: '35%', margin: '0.25rem auto'}} />
            </div>
          ))}
        </div> */}

      </div>
    );
  }
}

NLPIngredients.propTypes = propTypes;

export default NLPIngredients;
