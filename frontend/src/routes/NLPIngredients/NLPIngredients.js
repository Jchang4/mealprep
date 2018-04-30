import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Promise from 'bluebird';
import values from 'lodash/values';
import shuffle from '../../assets/js/shuffle';
import randomNumber from '../../assets/js/randomNumber';

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
  ingredients: PropTypes.object.isRequired,
  getRecipes: PropTypes.func.isRequired,
  getRecipeDetails: PropTypes.func.isRequired,
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
    const { getRecipes, preClassifyIngredients } = this.props;

    // Ex query: chicken,pasta, oregeno
    let q = query.split(/\s+|[,]/);
    let page = Math.round(randomNumber(1,4)); // get random page for variety
    console.log('query:', q);
    console.log('page:', page);
    return getRecipes(q, page)
    // // Pick 3 random recipes
    .then(({ data }) => {
      let r = shuffle(data);
      return r.slice(0,4);
    })
    // Get only recipe ids
    .then(recipes => recipes.map(r => r.recipe_id))
    // Pre classify and add to Redux
    .then(recipeIds => preClassifyIngredients(recipeIds))
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

  handleWordClick() {}
  handleDeleteLine(key) {
    this.props.removeIngredient(key);
  }

  render() {
    const { ingredients } = this.props;
    const ingreds = values(ingredients).slice(0, this.state.numLines);
    console.log(ingreds);

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

        <div style={{maxWidth: '800px', margin: '0 auto'}}>
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
        </div>

      </div>
    );
  }
}

export default NLPIngredients;
