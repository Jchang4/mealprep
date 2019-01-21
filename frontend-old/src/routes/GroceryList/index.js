import GroceryList from './GroceryList';
import './GroceryList.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import {
  addRecipe,
  getRecipeDetails,
} from '../../redux/recipes/actions';

// Redux
const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.allRecipes,
    planner: state.recipesOther.planner,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addRecipe,
    getRecipeDetails,
  }, dispatch);
}

const ConnectedGroceryList = connect(
  mapStateToProps,
  mapDispatchToProps
)(GroceryList);

export default ConnectedGroceryList;
