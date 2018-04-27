import RecipePicker from './RecipePicker';
import './RecipePicker.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import { removeRecipe } from '../../redux/recipes/actions';
import {
  addToPlanner,
  removeFromPlanner,
} from '../../redux/recipesOther/actions';

// Redux
const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
    planner: state.recipesOther.planner,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    // Recipes
    removeRecipe,
    // Planner
    addToPlanner,
    removeFromPlanner,
  }, dispatch);
}

const ConnectedRecipePicker = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipePicker);

export default ConnectedRecipePicker;
