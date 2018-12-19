export default {
  title: {
    description: "Title of recipe on the original site",
    type: String,
    required: true
  },
  source: {
    originalUrl: {
      description: "The url this recipe came from",
      type: String,
      required: true
    },
    company: {
      description:
        "Company this recipe came from - i.e. allrecipes, newyorktimes",
      type: String,
      trim: true,
      lowercase: true,
      required: true
    },
    imageUrl: {
      description:
        "Image of the recipe - only keep one so we don't flood their API with requests",
      type: String
    },
    apiName: {
      description: "Name of the API service this recipe came from",
      type: String
    },
    apiId: {
      description: "Id of the recipe used in the API",
      type: String
    }
  },
  cookTime: {
    prep: {
      description: "Time it takes to prepare ingredients in minutes",
      type: Number
    },
    cook: {
      description: "Time it takes to cook food in minutes",
      type: Number
    },
    totalTime: {
      description: "Total time to cook this recipe in minutes",
      type: Number
    }
  },
  ingredients: {
    description: "List of ingredients",
    type: [String],
    required: true
  },
  instructions: {
    description: "Instructions to cook recipe, in order",
    type: [String],
    required: true
  },
  notes: {
    description:
      "Notes or advice for how to cook, store leftovers, clean-up easily, etc",
    type: [String]
  },
  meta: {
    description:
      "Ratings, reviews, and other meta information about the recipe",
    type: {
      fiveStarReview: {
        description: "Number from 0 to 5 indicating 5-star review",
        type: Number
      },
      creator: {
        description: "Username of the recipe creator",
        type: String
      }
    }
  }
};
