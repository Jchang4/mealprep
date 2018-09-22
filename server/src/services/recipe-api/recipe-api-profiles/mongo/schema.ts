"use strict"

import mongoose from 'mongoose'
import Joi from 'joi'

export default {
    company: {
        name: Joi.string().required().description('Name of the company running the Recipe API.'),
        url: Joi.string().required().description('Url of the company\'s website'),
    },
    credentials: {
        accessToken: Joi.string().required().description('Access token to use the API.'),
        username: Joi.string().required().description('Username/Email used to sign into account.'),
        password: Joi.string().required().description('Password used to sign into account.'),
    },
    apiUrl: Joi.string().required().description('Main API Route - does not include the root path, i.e. /api/v1/recipes'),
    requestDelay: Joi.number().required().description('Number of seconds to delay each API request.'),
    requestsPerDay: Joi.number().required().description('Total number of API requests allowed per day.'),
    responsesPerDay: Joi.number().description('Total number of API responses allowed per day.'),
}