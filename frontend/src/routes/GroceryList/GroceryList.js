import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { getRecipe } from '../../api/f2f';

// Components
import Paper from 'material-ui/Paper';

class GroceryList extends Component {

  state = {
    ingredients: [],
  }

  componentDidMount() {
    this.getAllIngredients();
  }

  getAllIngredients() {
    const {
      recipes,
      planner,
      addRecipe,
    } = this.props;
    let ingredients = [];

    planner.forEach(p => {
      let r = recipes[p];
      if (r.ingredients)
        r.ingredients.map(i => ingredients.push(i));
      else {
        getRecipe(r.recipe_id)
        .then(data => {
          addRecipe(data); // add to redux
          let ingredients = this.state.ingredients;
          data.ingredients.map(i => ingredients.push(i));
          this.setState({ ingredients });
        })
        .catch(err => {
          console.log(err);
        });
      }
    });

    this.setState({ ingredients });
  }

  render() {
    const { ingredients } = this.state;

    return (
      <div className="GroceryList">
        <h1>Grocery List:</h1>

        <Paper zDepth={2}>
          <table>
            <thead>
              <tr>
                <th className="GroceryList_td">Amount</th>
                <th className="GroceryList_td">Unit</th>
                <th className="GroceryList_td">Ingredient</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingr,idx) => (
                <tr key={idx} className="GroceryList_tr">
                  <td className="GroceryList_td" style={{textAlign: 'center'}}>{ingr.amount}</td>
                  <td className="GroceryList_td">{ingr.unit}</td>
                  <td className="GroceryList_td">{ingr.ingredient}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Paper>
      </div>
    );
  }
}

// GroceryList.propTypes = propTypes;
// GroceryList.defaultProps = defaultProps;

export default GroceryList;
