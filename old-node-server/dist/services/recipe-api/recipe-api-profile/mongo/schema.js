"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = joi_1.default.object().keys({
    company: joi_1.default.object().keys({
        name: joi_1.default
            .string()
            .required()
            .meta({ index: true, unique: true })
            .description('Name of the company running the Recipe API.'),
        url: joi_1.default
            .string()
            .required()
            .description('Url of the company\'s website'),
    }),
    credentials: joi_1.default.object().keys({
        username: joi_1.default
            .string()
            .required()
            .meta({ index: true })
            .description('Username/Email used to sign into account.'),
        password: joi_1.default
            .string()
            .required()
            .description('Password used to sign into account.'),
        accessToken: joi_1.default
            .string()
            .required()
            .description('Access token to use the API.'),
        applicationId: joi_1.default.string().description('Application ID sent with each request (optional).'),
    }),
    headers: joi_1.default.object().description('Headers to be sent with the API request.'),
    apiUrl: joi_1.default
        .string()
        .required()
        .description('Main API Route - includes root path, i.e. https://edamam.com/api/v1/recipes'),
    requestDelay: joi_1.default
        .number()
        .required()
        .description('Number of seconds to delay each API request.'),
    requestsPerDay: joi_1.default
        .number()
        .required()
        .meta({ index: true })
        .description('Total number of API requests allowed per day.'),
    requestsPerMinute: joi_1.default
        .number()
        .required()
        .meta({ index: true })
        .description('Total number of API requests allowed per day.'),
    responsesPerDay: joi_1.default
        .number()
        .description('Total number of API responses allowed per day. If the company\'s pricing is in months, divide the number by 30.'),
});
//# sourceMappingURL=schema.js.map