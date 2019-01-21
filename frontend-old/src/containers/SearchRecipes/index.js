import SearchRecipes from './SearchRecipes';
import './SearchRecipes.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import {
  addRecipe, // add to redux
  removeRecipe,
  getRecipes, // get all recipes by query
} from '../../redux/recipes/actions';

// Redux
const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addRecipe,
    removeRecipe,
    getRecipes,
  }, dispatch);
}

const ConnectedSearchRecipes = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchRecipes);

export default ConnectedSearchRecipes;
