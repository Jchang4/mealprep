"use strict"

import mongoose from 'mongoose'
import Joigoose from 'joigoose'

import collectionName from './collection-name'
import recipeApiProfileSchema from './schema'


const recipeApiProfileMongooseSchema = new mongoose.Schema(
    Joigoose(mongoose).convert(recipeApiProfileSchema),
    { collection: collectionName }
)

export default mongoose.model(
    collectionName, 
    recipeApiProfileMongooseSchema
)