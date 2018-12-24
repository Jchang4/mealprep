"use strict"

import mongoose from 'mongoose'
import Joi, { required } from 'joi'
import RecipeApiProfileCollectionName from '../../recipe-api-profile/mongo/collection-name'

export default Joi.object().keys({
    recipeApiProfileId: Joi.object().meta({
        type: mongoose.Schema.Types.ObjectId,
        ref: RecipeApiProfileCollectionName,
        required: true,
        index: true,
    }),
    createdDate: Joi
        .date()
        .required()
        .meta({ index: true })
        .description('Date the API request was made to a Recipe API Service.'),
    responseStatusCode: Joi
        .number()
        .required()
        .description('HTTP response status code returned from Recipe API Service.'),
    responseStatusMessage: Joi 
        .string()
        .description('Response message mostly used to keep track of errors and avoid violations.'),
})