"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const figlet_1 = __importDefault(require("figlet"));
// Server Config
const config_1 = __importDefault(require("./config"));
const app = express_1.default();
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(config_1.default.PORT, () => {
    console.log(figlet_1.default.textSync('Mealprep App', {
        font: 'Crawford'
    }));
    console.log(`Listening on port: ${config_1.default.PORT}`);
});
//# sourceMappingURL=index.js.map