"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const figlet_1 = __importDefault(require("figlet"));
// Server Config
const config_1 = __importDefault(require("./config"));
const mongo_connection_1 = __importDefault(require("./lib/mongo-connection"));
const bluebird_1 = __importDefault(require("bluebird"));
const repo_1 = __importDefault(require("./services/recipe-api/recipe-api-profile/repo"));
const repo_2 = __importDefault(require("./services/recipe-api/recipe-api-event/repo"));
const app = express_1.default();
app.get('*', (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.json(yield bluebird_1.default.props({
        recipeApiEvents: repo_2.default.find({}),
        recipeApiProfiles: repo_1.default.find({}),
    }));
}));
app.listen(config_1.default.PORT, () => {
    mongo_connection_1.default.connect();
    // Start Server
    console.log(figlet_1.default.textSync('Mealprep App', {
        font: 'Crawford'
    }));
    console.log(`Listening on port: ${config_1.default.PORT}`);
});
//# sourceMappingURL=index.js.map