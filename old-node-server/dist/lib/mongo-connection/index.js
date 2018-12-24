"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Config
const config_1 = __importDefault(require("../../config"));
function connect() {
    mongoose_1.default.connect(config_1.default.MONGO_CONNECTION_URI, { useNewUrlParser: true });
    mongoose_1.default.set('useCreateIndex', true);
}
function close() {
    mongoose_1.default.connection.close();
}
exports.default = {
    connect,
    close,
};
//# sourceMappingURL=index.js.map