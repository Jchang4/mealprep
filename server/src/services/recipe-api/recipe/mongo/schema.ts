export default {
    title: {
        description: 'Title of recipe on the original site.',
        type: String,
        required: true,
    },
    source: {
        originalUrl: {
            description: 'The url this recipe came from.',
            type: String,
        },
        company: {
            description: 'Company this recipe came from - i.e. allrecipes, newyorktimes.',
            type: String,
            trim: true,
            lowercase: true,
        },
    },
    cookTime: {
        prep: {
            description: 'Time it takes to prepare ingredients in minutes.',
            type: Number,
        },
        cook: {
            description: 'Time it takes to cook food in minutes.',
            type: Number,
        },
        totalTime: {
            description: 'Total time to cook this recipe - taken from prep and cook times.',
            type: Number,
            set: (doc: any) => doc.cookTime.prep + doc.cookTime.cook,
        },
    },
    ingredients: {
        description: 'List of ingredients.',
        type: [String],
    },
    instructions: {
        description: 'Instructions to cook recipe, in order',
        type: [String],
    },
    notes: {
        description: 'Notes or advice for how to cook, store leftovers, clean-up easily, etc.',
        type: [String],
    },
}