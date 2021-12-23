"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Item = require('./Schema/Item');
const User = require('./Schema/User');
class Database {
    uri;
    options;
    constructor(uri, options) {
        this.uri = uri;
        this.options = options ? options : {};
    }
    async connect() {
        await mongoose_1.default.connect(this.uri, this.options);
        console.log('Connected to Database');
    }
    async viewOne(id) {
        try {
            const item = await Item.findById(id);
            return item;
        }
        catch (err) {
            const error = new ReferenceError(`Product with id ${id} does not exist`);
            error.code = '404';
            throw error;
        }
    }
    async viewAll(opt) {
        if (!opt) {
            const items = await Item.find();
            return items;
        }
        const regex = new RegExp(opt.str, 'i');
        const items = await Item.find({ [opt.byWhat]: regex }, null, { limit: 5 });
        if (!(`${opt.byWhat}` in items[0])) {
            const error = new ReferenceError(`byWhat '${opt.byWhat}' option is incorrect! Check your DB document keys.`);
            error.code = '406';
            throw error;
        }
        return items;
    }
    async doesUserExist(field, str) {
        const it = await User.find({ [field]: str }, null, { limit: 1 });
        return it.length !== 0;
    }
}
exports.Database = Database;
const _shop = new Database(process.env.MONGO, { useNewUrlParser: true });
exports.default = _shop;
