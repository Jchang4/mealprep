"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const joigoose_1 = __importDefault(require("joigoose"));
const collection_name_1 = __importDefault(require("./collection-name"));
const schema_1 = __importDefault(require("./schema"));
const recipeApiEventMongooseSchema = new mongoose_1.default.Schema(joigoose_1.default(mongoose_1.default).convert(schema_1.default), { collection: collection_name_1.default });
exports.default = mongoose_1.default.model(collection_name_1.default, recipeApiEventMongooseSchema);
//# sourceMappingURL=model.js.map