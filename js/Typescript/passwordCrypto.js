"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyHash = exports.genHash = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
function genHash(pass) {
    const salt = crypto_js_1.default.lib.WordArray.random(32).toString();
    const hash = crypto_js_1.default.PBKDF2(pass, salt, {
        keySize: 512 / 32
    }).toString();
    return { salt: salt, hash: hash };
}
exports.genHash = genHash;
function verifyHash(pass, salt, hash) {
    const hashVer = crypto_js_1.default.PBKDF2(pass, salt, {
        keySize: 512 / 32
    }).toString();
    return hashVer === hash;
}
exports.verifyHash = verifyHash;
