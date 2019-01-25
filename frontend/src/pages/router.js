import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// Pages
// import Home from "./home";
import Recipes from "./recipes";

const AppRouter = () => (
  <Router>
    <Switch>
      <Route path="/" component={Recipes} />
      <Redirect to="/" />
    </Switch>
  </Router>
);

export default AppRouter;
