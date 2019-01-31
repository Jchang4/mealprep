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
import RecipePicker from "./recipe-picker";
import RecipeDetails from "./recipe-details";

const AppRouter = () => (
  <Page>
    <Router>
      <Switch>
        <Route path="/recipe/:recipeId" component={RecipeDetails} />
        <Route path="/recipe" component={RecipePicker} />
        <Route path="/" component={RecipePicker} />
        <Redirect to="/" />
      </Switch>
    </Router>
  </Page>
);

export default AppRouter;
