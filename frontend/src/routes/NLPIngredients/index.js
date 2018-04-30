import NLPIngredients from './NLPIngredients';
import './NLPIngredients.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import {
  getRecipes,
} from '../../redux/recipes/actions';
import {
  preClassifyIngredients,
  removeIngredient,
} from '../../redux/nlp/actions';

// Redux
const mapStateToProps = (state) => {
  return {
    ingredients: state.nlp,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getRecipes,
    // NLP
    preClassifyIngredients,
    removeIngredient,
  }, dispatch);
}

const ConnectedNLPIngredients = connect(
  mapStateToProps,
  mapDispatchToProps
)(NLPIngredients);

export default ConnectedNLPIngredients;
