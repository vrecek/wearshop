"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Database_1 = __importDefault(require("../Database"));
router.get('/search/:str', async (req, res) => {
    try {
        const item = await Database_1.default.viewAll({ byWhat: 'name', str: req.params.str });
        res.json(item);
    }
    catch (err) {
        console.log(err);
    }
});
router.get('/products/:id', async (req, res) => {
    try {
        const item = await Database_1.default.viewOne(req.params.id);
        res.json(item);
    }
    catch (err) {
        res.status(404).end();
    }
});
router.get('/', async (req, res) => {
    try {
        const it = await Database_1.default.viewAll();
        res.json(it);
    }
    catch (err) {
        throw err;
    }
});
module.exports = router;
