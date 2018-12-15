"use strict"

import mongoose from 'mongoose'
import recipeSchema from './schema'

const recipeMongooseSchema = new mongoose.Schema(recipeSchema)

export default mongoose.model(
    'Recipe',
    recipeMongooseSchema
)