"use strict"

import mongoose from 'mongoose'
import Joigoose from 'joigoose'

import recipeApiProfileSchema from './schema'

const recipeApiProfileMongooseSchema = new mongoose.Schema(
    Joigoose(mongoose).convert(recipeApiProfileSchema),
    { collection: 'RecipeApiProfile' }
)

export default mongoose.model(
    'RecipeApiProfile', 
    recipeApiProfileMongooseSchema
)