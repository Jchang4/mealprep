import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import thunkMiddleware from 'redux-thunk';

// Reducers
import recipesReducer from './recipes/reducer';
import recipesOtherReducer from './recipesOther/reducer';
import nlpReducer from './nlp/reducer';

const reducer = combineReducers({
  recipes: recipesReducer,
  recipesOther: recipesOtherReducer,
  nlp: nlpReducer,
});


// Middleware
const middleware = applyMiddleware(
  thunkMiddleware,
);

const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;


// Store
const store = createStore(
  reducer,
  composeEnhancers(middleware)
);

export default store;
