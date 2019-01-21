import React, { Component } from 'react';
import PropTypes from 'prop-types';

// components
import SearchIcon from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const propTypes = {
  // Props
  onEnter: PropTypes.func,
  // Redux Actions
  addRecipe: PropTypes.func.isRequired,
  removeRecipe: PropTypes.func.isRequired,
  getRecipes: PropTypes.func.isRequired,
};
const defaultProps = {
  onEnter: () => {},
};

class SearchRecipes extends Component {

  state = {
    search: ''
  }

  handleSearchBarChange(e) {
    this.setState({
      search: e.target.value
    });
  }

  handleSearchButtonClick(e) {
    const { getRecipes } = this.props;
    let search = this.state.search;
    // split on commas and spaces
    search = search.split(/,|\s/).filter(s => s.length > 0 ? true : false);

    return getRecipes(search)
    .catch(err => {
      console.log('Failed to search on button click.');
      console.log(err);
    });
  }

  render() {
    return (
      <div className="SearchRecipes_container">
        <div className="SearchRecipes">
          <TextField
            style={{width: '100%'}}
            onChange={(e) => this.handleSearchBarChange(e)}
            floatingLabelText={(
              <div style={{display: 'flex'}}>
                <SearchIcon />
                <div style={{marginLeft: '0.5rem'}}>Search</div>
              </div>
            )}
          />

          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <RaisedButton
              label="Get me recipes!"
              primary={true}
              onClick={(e) => this.handleSearchButtonClick(e)}
            />
          </div>
        </div>
      </div>
    );
  }
}

SearchRecipes.propTypes = propTypes;
SearchRecipes.defaultProps = defaultProps;

export default SearchRecipes;
