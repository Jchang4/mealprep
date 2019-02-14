
module.exports = {
  title: {
    description: 'Title of the recipe',
    type: String
    required: true,
  },
  imageUrl: {
    description: 'Image URL of the recipe / dish',
    type: String,
  },
  ingredients: {
    description: 'List of ingredients',
    type: String[],
  },
  instructions: {
    description: 'List of instructions',
    type: String[],
  },
  cookingTime: {
    description: 'Cooking time in minutes',
    type: {
      prep: Number,
      cook: Number,
      total: Number,
    }
  }
  fiveStarRating: Number,
  notes: String[],
  source: {
    originalUrl: {
      description: 'Full URL of the recipe',
      type: String,
      required: true,
    },
    company: {
      description: 'Company the recipe was sourced from - i.e. AllRecipe, BudgetBytes',
      type: String,
      required: true,
    },
    apiName: {
      description: 'Specify API name is recipe taken from an API - i.e. Edamam',
      type: String,
    },
    recipeId: {
      description: 'Id of the recipe from the website, usually found in URL',
      type: String,
    }
  }
}