import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

// Components
import Navbar from '../components/Navbar';

// Routes
import Home from './Home';
import RecipePicker from './RecipePicker';
import GroceryList from './GroceryList';
import NLPIngredients from './NLPIngredients';
// import Test from './Test';


function Routes() {
  return (
    <Router>
      <div>
        <Navbar />

        <div style={{padding: '0 1rem', marginBottom: '5rem'}}>
          <Switch>
            {/* <Route path="/test" component={Test} /> */}
            <Route path="/nlp" component={NLPIngredients} />
            <Route path="/grocery" component={GroceryList} />
            <Route path="/recipes" component={RecipePicker} />
            <Route path="/" component={Home} exact />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default Routes;
