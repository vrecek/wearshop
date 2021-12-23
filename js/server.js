"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const path_1 = __importDefault(require("path"));
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
require('dotenv').config({ path: path_1.default.join(__dirname, '../.env') });
/* ----------------------------------------------------------------------------- */
const Database_1 = __importDefault(require("./Database"));
Database_1.default.connect();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
/**
 * PASSPORT LOCAL & EXPRESS SESSION
*/
app.use(session({
    secret: 'secretkeysession',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO
    }),
    cookie: {
        maxAge: 1000 * 60
    }
}));
require('./Typescript/passportjs');
app.use(passport.initialize());
app.use(passport.session());
/* ----------------------------------------------------------------------------- */
/**
 * ROUTES
*/
app.use('/items', require('./Routes/items'));
app.use('/mailer', require('./Routes/mailer'));
app.use('/users', require('./Routes/logreg'));
/* --------------------------------------------------- */
app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.send('auth');
    }
    else {
        res.send('not auth');
    }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
