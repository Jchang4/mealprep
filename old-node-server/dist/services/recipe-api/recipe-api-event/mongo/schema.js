"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const collection_name_1 = __importDefault(require("../../recipe-api-profile/mongo/collection-name"));
exports.default = joi_1.default.object().keys({
    recipeApiProfileId: joi_1.default.object().meta({
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: collection_name_1.default,
        required: true,
        index: true,
    }),
    createdDate: joi_1.default
        .date()
        .required()
        .meta({ index: true })
        .description('Date the API request was made to a Recipe API Service.'),
    responseStatusCode: joi_1.default
        .number()
        .required()
        .description('HTTP response status code returned from Recipe API Service.'),
    responseStatusMessage: joi_1.default
        .string()
        .description('Response message mostly used to keep track of errors and avoid violations.'),
});
//# sourceMappingURL=schema.js.map