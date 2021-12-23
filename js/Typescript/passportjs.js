"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = require('../Schema/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passwordCrypto_1 = require("./passwordCrypto");
const verifyCallback = (username, password, done) => {
    User.findOne({ username: username })
        .then((user) => {
        if (!user)
            return done(null, false);
        const isValid = (0, passwordCrypto_1.verifyHash)(password, user.salt, user.hash);
        if (isValid)
            return done(null, user);
        else
            return done(null, false);
    })
        .catch((err) => done(err));
};
const strategy = new LocalStrategy(verifyCallback);
passport.use(strategy);
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then((user) => {
        done(null, user);
    })
        .catch((err) => done(err));
});
