"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Database_1 = require("../Database");
const _shop = new Database_1.Database(process.env.MONGO, { useNewUrlParser: true });
router.get('/search/:str', async (req, res) => {
    try {
        const item = await _shop.viewAll({ byWhat: 'name', str: req.params.str });
        res.json(item);
    }
    catch (err) {
        console.log(err);
    }
});
router.get('/products/:id', async (req, res) => {
    try {
        const item = await _shop.viewOne(req.params.id);
        res.json(item);
    }
    catch (err) {
        res.status(404).end();
    }
});
router.get('/', async (req, res) => {
    try {
        const it = await _shop.viewAll();
        res.json(it);
    }
    catch (err) {
        throw err;
    }
});
module.exports = router;
