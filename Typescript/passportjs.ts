const User = require('../Schema/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
import { verifyHash } from "./passwordCrypto";

const verifyCallback = (username:any,password:any,done:Function):void => {
   User.findOne({ username: username })
      .then((user:any) => {
         if(!user) return done(null, false);

         const isValid = verifyHash(password, user.salt, user.hash);

         if(isValid) return done(null, user);
         else return done(null, false);
      })
      .catch((err:any) => done(err))
}

const strategy = new LocalStrategy(verifyCallback);
passport.use(strategy);

passport.serializeUser(function(user:any, done:Function) {
   done(null, user.id);
 });
 
 passport.deserializeUser(function(id:any, done:Function) {
   User.findById(id)
      .then((user:any) => {
         done(null,user)
      })
      .catch((err:any) => done(err))
 });