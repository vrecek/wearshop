"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
require('dotenv').config({ path: path_1.default.join(__dirname, '../.env') });
const Database_1 = require("./Database");
const _shop = new Database_1.Database(process.env.MONGO, { useNewUrlParser: true });
_shop.connect();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/items', require('./Routes/items'));
app.use('/mailer', require('./Routes/mailer'));
app.get('/', (req, res) => {
    res.send('xfd');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
