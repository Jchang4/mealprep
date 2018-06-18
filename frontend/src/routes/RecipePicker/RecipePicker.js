import React, { Component } from 'react';
import PropTypes from 'prop-types';
import values from 'lodash/values';

// Components
import RaisedButton from 'material-ui/RaisedButton'
import SearchRecipes from '../../containers/SearchRecipes';
import RecipeCard from '../../components/Cards/RecipeCard';
import PagingButtons from '../../components/PagingButtons';


const propTypes = {
  recipes: PropTypes.object,
  // Redux Actions
  removeRecipe: PropTypes.func.isRequired,
  addToPlanner: PropTypes.func.isRequired,
  removeFromPlanner: PropTypes.func.isRequired,
};

const defaultProps = {};

class RecipePicker extends Component {

  state = {
    range: [0,10], // show 10 recipes on default
    page: 1,
  }

  componentDidMount() {
    window.scrollTo(0,0);
  }

  handleNextPage() {
    const { range, page } = this.state;
    let recipes = values(this.props.recipes);

    if (range[1] < recipes.length) {
      window.scrollTo(0,0);
      this.setState({
        page: page+1,
        range: [range[1], range[1] + 9],
      });
    }
  }

  handlePrevPage() {
    const { range, page } = this.state;

    if (range[0] >= 9) {
      this.setState({
        page: page-1,
        range: [range[0]-9, range[1]-9]
      });
    } else {
      this.setState({
        page: 1,
        range: [0,9]
      });
    }

    // Callstack trick
    setTimeout(() => {
      // Scroll to bottom of page
      window.scrollTo(0, document.body.scrollHeight);
    }, 0);
  }

  // Add/Remove recipeId from planner
  handleCardClick(recipeId) {
    const {
      planner,
      addToPlanner,
      removeFromPlanner,
    } = this.props;

    if (planner.has(recipeId)) {
      removeFromPlanner(recipeId);
    } else {
      addToPlanner(recipeId);
    }
  }

  // Remove recipe from recipes & planner
  handleCardDeleteClick(e, recipeId) {
    const {
      planner,
      removeRecipe,
      removeFromPlanner,
    } = this.props;

    e.stopPropagation();
    e.preventDefault();

    if (planner.has(recipeId)) {
      removeFromPlanner(recipeId);
    }

    removeRecipe(recipeId);
  }

  render() {
    const { recipes, planner, history } = this.props;
    const { range, page } = this.state;
    const allRecipes = values(recipes)
      .sort((a,b) => (a.social_rank < b.social_rank) ? 1 : -1)
      .slice(range[0], range[1]);

    // let totalPages = Math.floor(Object.keys(recipes).length / 10);
    let totalPages = '';
    // console.log(Object.keys(recipes).length);

    return (
      <div className="RecipePicker">

        <SearchRecipes />

        <div className="RecipePicker_cardContainer">
          {allRecipes.map((r,i) => (
            <RecipeCard
              key={i}
              success={planner.has(r.recipe_id)}
              title={r.title}
              publisher={r.publisher}
              imageUrl={r.image_url}
              sourceUrl={r.source_url}
              socialRank={r.social_rank}
              onClick={() => this.handleCardClick(r.recipe_id)}
              onDeleteClick={(e) => this.handleCardDeleteClick(e, r.recipe_id)}
            />
          ))}
        </div>

        {/* Directional Buttons */}
        <PagingButtons
          pageNumber={page}
          totalPages={totalPages}
          onNextClick={() => this.handleNextPage()}
          onPrevClick={() => this.handlePrevPage()}
        />

        <div style={{padding: '1rem', display: 'flex', 'justifyContent': 'flex-end'}}>
          <RaisedButton
            primary={true}
            label="Continue"
            onClick={() => history.push('/grocery')}
          />
        </div>
      </div>
    );
  }
}

RecipePicker.propTypes = propTypes;
RecipePicker.defaultProps = defaultProps;

export default RecipePicker;
