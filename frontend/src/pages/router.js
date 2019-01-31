import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Page from "components/page";

// Pages
// import Home from "./home";
import Recipes from "./recipes";

const AppRouter = () => (
  <Page>
    <Router>
      <Switch>
        <Route path="/" component={Recipes} />
        <Redirect to="/" />
      </Switch>
    </Router>
  </Page>
);

export default AppRouter;
