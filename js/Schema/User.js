"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User = new mongoose_1.default.Schema({
    username: {
        required: true,
        type: String
    },
    mail: {
        required: true,
        type: String
    },
    salt: {
        required: true,
        type: String
    },
    hash: {
        required: true,
        type: String
    }
});
module.exports = mongoose_1.default.model('User', User);
