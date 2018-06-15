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
} from '../../redux/nlp/actions';

// Redux
const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
    preClassifiedIngredients: state.nlp.preClassified,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getRecipes,
    getIngredients,
    // NLP
    getClassifiedIngredients,
  }, dispatch);
}

const ConnectedNLPIngredients = connect(
  mapStateToProps,
  mapDispatchToProps
)(NLPIngredients);

export default ConnectedNLPIngredients;
