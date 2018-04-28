import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Promise from 'bluebird';
import values from 'lodash/values';
import shuffle from '../../assets/js/shuffle';

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

class NLPIngredients extends Component {

  state = {
    numLines: 7,
    currLabel: '',
    currColor: '',
  }

  handleLabelSelect(label, color) {
    this.setState({ currLabel: label, currColor: color });
  }

  /* handleSearchClick
        Search for recipes, get ingredients, set ingredients to state.nlp
  */
  handleSearchClick(searchQuery) {

  }

  /* Change number of lines to classify at a time */
  handleChangeNumLines(numLines) {
    this.setState({ numLines });
  }

  render() {
    const { ingredients } = this.props;
    const ingreds = values(ingredients).slice(0, this.state.numLines);

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



      </div>
    );
  }
}

export default NLPIngredients;
