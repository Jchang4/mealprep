import React, { Component } from 'react';
import values from 'lodash/values';

// Components
// import RecipeCard from '../../components/Cards/RecipeCard';

class Test extends Component {
  render() {
    const { recipes } = this.props;
    const allRecipes = values(recipes);

    return (
      <div>
        {allRecipes.map((r,i) => (
          <div style={{ padding: '2rem', maxWidth: '300px' }}>
            <div>{r.title}</div>
            <div>{r.publisher}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default Test;
