"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = {
    company: {
        name: joi_1.default.string().required().description('Name of the company running the Recipe API.'),
        url: joi_1.default.string().required().description('Url of the company\'s website'),
    },
    credentials: {
        accessToken: joi_1.default.string().required().description('Access token to use the API.'),
        username: joi_1.default.string().required().description('Username/Email used to sign into account.'),
        password: joi_1.default.string().required().description('Password used to sign into account.'),
    },
    apiUrl: joi_1.default.string().required().description('Main API Route - does not include the root path, i.e. /api/v1/recipes'),
    requestDelay: joi_1.default.number().required().description('Number of seconds to delay each API request.'),
    requestsPerDay: joi_1.default.number().required().description('Total number of API requests allowed per day.'),
    responsesPerDay: joi_1.default.number().description('Total number of API responses allowed per day.'),
};
//# sourceMappingURL=schema.js.map