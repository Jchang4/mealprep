"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_repo_1 = __importDefault(require("../../../../lib/create-repo"));
const model_1 = __importDefault(require("../mongo/model"));
exports.default = create_repo_1.default(model_1.default);
//# sourceMappingURL=index.js.map