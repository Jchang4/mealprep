"use strict"

import mongoose from 'mongoose'
import joigoose from 'joigoose'

import collectionName from './collection-name'
import recipeApiProfileSchema from './schema'

const recipeApiProfileMongooseSchema = new mongoose.Schema(
    joigoose(mongoose).convert(recipeApiProfileSchema
))

export default mongoose.model(
    collectionName, 
    recipeApiProfileMongooseSchema
)