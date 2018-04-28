import NLPIngredients from './NLPIngredients';
import './NLPIngredients.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import {
  addRecipe,
  addRecipeDetails,
} from '../../redux/recipes/actions';
import {
  preClassifyIngredients,
} from '../../redux/nlp/actions';

// Redux
const mapStateToProps = (state) => {
  return {
    ingredients: state.nlp,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addRecipe,
    addRecipeDetails,
    // NLP
    preClassifyIngredients,
  }, dispatch);
}

const ConnectedNLPIngredients = connect(
  mapStateToProps,
  mapDispatchToProps
)(NLPIngredients);

export default ConnectedNLPIngredients;
