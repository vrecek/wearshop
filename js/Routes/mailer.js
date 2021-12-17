"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
require('dotenv').config({ path: path_1.default.join(__dirname, '../.env') });
const nodemailer = require('nodemailer');
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    try {
        const { nick, mail, textarea } = req.body;
        if (!nick || !mail || !textarea)
            throw new Error('Both "nick" and "mail" fields are required.');
        const transporter = await nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: "OAuth2",
                user: process.env.MAIL,
                clientId: process.env.CL_ID,
                clientSecret: process.env.MAIL_SECRET,
                refreshToken: process.env.REF_TOK
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        const mailOptions = {
            from: `${nick} <${process.env.MAIL}`,
            to: process.env.MAIL,
            subject: 'Wearshop Opinion',
            html: `<h1>User info:</h1>
         <h2>mail: ${mail}</h2>
         <h2>nick: ${nick}</h2>
         <h4>${textarea}</h4>
         `
        };
        const send = await transporter.sendMail(mailOptions);
        res.json({ msg: 'Mail sucessfully sent' });
    }
    catch (err) {
        if (err.code === 'EAUTH') {
            res.statusMessage = 'Authentication failed. Try again or contact us directly.';
            res.status(403).end();
        }
        else {
            res.statusMessage = err.message;
            res.status(406).end();
        }
    }
});
module.exports = router;
