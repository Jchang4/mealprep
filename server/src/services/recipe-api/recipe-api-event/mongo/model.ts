"use strict"

import mongoose from 'mongoose'
import Joigoose from 'joigoose'

import collectionName from './collection-name'
import recipeApiEventSchema from './schema'

const recipeApiEventMongooseSchema = new mongoose.Schema(
    Joigoose(mongoose).convert(recipeApiEventSchema),
    { collection: collectionName }
)

export default mongoose.model(
    collectionName,
    recipeApiEventMongooseSchema
)