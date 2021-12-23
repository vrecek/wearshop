/**
 * IMPORTS
*/
import e from 'express';
import express, { Request, Response } from 'express'; const app = express();
import path from 'path';
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
require('dotenv').config({path: path.join(__dirname, '../.env')});
/* ----------------------------------------------------------------------------- */

import _shop from './Database';
_shop.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
}))
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

app.get('/', (req:Request,res:Response):void => {
   if(req.isAuthenticated()){
      res.send('auth')
   }else{
      res.send('not auth')
   }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`))