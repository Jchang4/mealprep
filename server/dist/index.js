"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const figlet_1 = __importDefault(require("figlet"));
const app = express_1.default();
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(3000, () => {
    console.log(figlet_1.default.textSync('Mealprep App'));
});
//# sourceMappingURL=index.js.map