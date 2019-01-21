import Test from './Test';
import './Test.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import {} from '../../redux/recipes/actions';

// Redux
const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.allRecipes,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({

  }, dispatch);
}

const ConnectedTest = connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);

export default ConnectedTest;
