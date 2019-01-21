import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import thunkMiddleware from 'redux-thunk';

// Reducers
import recipesReducer from './recipes/reducer';

const reducer = combineReducers({
  recipes: recipesReducer,
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
