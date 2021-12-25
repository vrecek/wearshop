"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const EmailValidator = __importStar(require("email-validator"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const Database_1 = __importDefault(require("../Database"));
const passwordCrypto_1 = require("../Typescript/passwordCrypto");
const passport = require('passport');
const User = require('../Schema/User');
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    if (req.isAuthenticated()) {
        const loggedUser = await User.findById(req.session.passport.user);
        res.json({ bool: true, user: loggedUser });
    }
    else {
        res.json({ bool: false, user: null });
    }
});
router.get('/logout', (req, res) => {
    if (req.isAuthenticated()) {
        req.logout();
        res.redirect('http://localhost:3000');
    }
    else {
        res.redirect('http://localhost:3000/error');
    }
});
router.post('/login', passport.authenticate('local', { failureRedirect: '/users/failed' }), (req, res) => {
    if (req.body.remember) {
        const infiniteTime = Math.pow(2, 31) - 1;
        req.session.cookie.maxAge = infiniteTime;
    }
    res.json({ result: true });
});
router.post('/register', async (req, res) => {
    const { user, mail, pass, passconf, check, captcha } = req.body;
    /**
     * VALIDATE USER INPUTS
    */
    const errors = [];
    /* NICKNAME */
    if (!user)
        errors.push('Please enter username');
    else if (user.length < 4)
        errors.push('Username must have minimum 4 characters');
    else if (!/^[a-z0-9]+$/i.test(user))
        errors.push('Nickname must have contain only alphanumerics');
    else {
        const result = await Database_1.default.doesUserExist('username', user);
        result ? errors.push('Nickname is already taken') : null;
    }
    /* MAIL ADDRESS */
    if (!mail)
        errors.push('Please enter mail address');
    else if (!EmailValidator.validate(mail))
        errors.push('Your mail is incorrect');
    else {
        const result = await Database_1.default.doesUserExist('mail', mail);
        result ? errors.push('Mail is already taken') : null;
    }
    /* PASSWORDS */
    const illegal = ['.', '<', '>', '='];
    let passess = true;
    if (pass.length < 5)
        errors.push('Password must contain minimum 4 characters');
    else {
        for (let char of illegal) {
            if (pass.indexOf(char) !== -1) {
                errors.push('Password cant contain: ". < > =" characters');
                passess = false;
                break;
            }
        }
    }
    if (passess)
        pass !== passconf ? errors.push('Passwords are different') : null;
    /* CHECKBOX */
    if (!check)
        errors.push('You must accept our T&S');
    /* CAPTCHA */
    const captchaVer = await (0, node_fetch_1.default)(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_CAPTCHA}&response=${captcha}`, { method: "POST" })
        .then((_res) => _res.json());
    captchaVer.success ? null : errors.push('Please complete captcha');
    /**
     * AFTER VALIDATING
    */
    if (errors.length !== 0)
        return res.json({ bool: false, res: errors });
    const { salt, hash } = (0, passwordCrypto_1.genHash)(pass);
    const newUser = new User({
        username: user,
        mail: mail,
        salt: salt,
        hash: hash
    });
    const saved = await newUser.save();
    res.json({ bool: true, res: ['You have successfully registered.', 'You can login now.'] });
});
// AUTHENTICATE FAILED
router.get('/failed', (req, res) => {
    res.json({ result: false });
});
module.exports = router;
