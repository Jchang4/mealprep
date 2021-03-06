import NLPIngredients from './NLPIngredients';
import './NLPIngredients.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import {
  getRecipes,
  getIngredients,
} from '../../redux/recipes/actions';
import {
  getClassifiedIngredients,
  updateIngredient,
  removeIngredient,
  postIngredientsToApi,
} from '../../redux/nlp/actions';

// Redux
const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
    nlp: state.nlp,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getRecipes,
    getIngredients,
    // NLP
    getClassifiedIngredients,
    updateIngredient,
    removeIngredient,
    postIngredientsToApi,
  }, dispatch);
}

const ConnectedNLPIngredients = connect(
  mapStateToProps,
  mapDispatchToProps
)(NLPIngredients);

export default ConnectedNLPIngredients;
