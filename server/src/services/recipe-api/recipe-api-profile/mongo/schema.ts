"use strict"

import Joi from 'joi'

export default Joi.object().keys({
    company: Joi.object().keys({
        name: Joi
            .string()
            .required()
            .meta({  index: true, unique: true })
            .description('Name of the company running the Recipe API.'),
        url: Joi
            .string()
            .required()
            .description('Url of the company\'s website'),
    }),
    credentials: Joi.object().keys({
        username: Joi
            .string()
            .required()
            .meta({ index: true })
            .description('Username/Email used to sign into account.'),
        password: Joi
            .string()
            .required()
            .description('Password used to sign into account.'),
        accessToken: Joi
            .string()
            .required()
            .description('Access token to use the API.'),
        applicationId: Joi.string().description('Application ID sent with each request (optional).'),
    }),
    headers: Joi.object().description('Headers to be sent with the API request.'),
    apiUrl: Joi
        .string()
        .required()
        .description('Main API Route - includes root path, i.e. https://edamam.com/api/v1/recipes'),
    requestDelay: Joi
        .number()
        .required()
        .description('Number of seconds to delay each API request.'),
    requestsPerDay: Joi
        .number()
        .required()
        .meta({ index: true })
        .description('Total number of API requests allowed per day.'),
    requestsPerMinute: Joi
        .number()
        .required()
        .meta({ index: true })
        .description('Total number of API requests allowed per day.'),
    responsesPerDay: Joi
        .number()
        .description('Total number of API responses allowed per day. If the company\'s pricing is in months, divide the number by 30.'),
})