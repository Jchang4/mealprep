"use strict"

import mongoose from 'mongoose'
import Joigoose from 'joigoose'

import recipeApiEventSchema from './schema'

const recipeApiEventMongooseSchema = new mongoose.Schema(
    Joigoose(mongoose).convert(recipeApiEventSchema),
    { collection: 'RecipeApiEvent' }
)

export default mongoose.model(
    'RecipeApiEvent',
    recipeApiEventMongooseSchema
)