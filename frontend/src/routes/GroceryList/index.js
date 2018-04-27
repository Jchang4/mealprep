import GroceryList from './GroceryList';
import './GroceryList.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import {
  addRecipe,
  addRecipeDetails,
} from '../../redux/recipes/actions';

// Redux
const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.allRecipes,
    planner: state.recipes.planner,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addRecipe,
    addRecipeDetails,
  }, dispatch);
}

const ConnectedGroceryList = connect(
  mapStateToProps,
  mapDispatchToProps
)(GroceryList);

export default ConnectedGroceryList;
