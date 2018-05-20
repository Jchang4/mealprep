import React, { Component } from 'react';
import values from 'lodash/values';
import axios from 'axios';

// Components
// import RecipeCard from '../../components/Cards/RecipeCard';

class Test extends Component {
  render() {
    const { recipes } = this.props;
    const allRecipes = values(recipes);

    return (
      <div>
        <h1>Test page</h1>
        {/* {allRecipes.map((r,i) => (
          <div style={{ padding: '2rem', maxWidth: '300px' }}>
            <div>{r.title}</div>
            <div>{r.publisher}</div>
          </div>
        ))} */}
      </div>
    );
  }
}

export default Test;
