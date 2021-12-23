import express, { Response, Request } from "express";
import * as EmailValidator from 'email-validator';
import fetch from 'node-fetch'
import _shop from "../Database";
import { genHash } from "../Typescript/passwordCrypto";
const passport = require('passport');
const User = require('../Schema/User');
const router = express.Router();

interface Object {
   success: boolean,
   [key:string]:any
}

router.post('/login', passport.authenticate('local', { failureRedirect: '/users/failed' }), (req:Request,res:Response) => {
   if(req.body.remember){
      const infiniteTime = Math.pow(2,31) - 1;
      req.session.cookie.maxAge = infiniteTime;
   }

   res.json({ result: true })
})

router.post('/register', async (req:Request,res:Response) => {
   const { user, mail, pass, passconf, check, captcha } = req.body;

   /**
    * VALIDATE USER INPUTS
   */
   const errors:string[] = [];

   /* NICKNAME */
   if(!user) errors.push('Please enter username');
   else if(user.length < 4) errors.push('Username must have minimum 4 characters');
   else if(!/^[a-z0-9]+$/i.test(user)) errors.push('Nickname must have contain only alphanumerics');
   else{ 
      const result = await _shop.doesUserExist('username', user);
      result ? errors.push('Nickname is already taken') : null
   }

   /* MAIL ADDRESS */
   if(!mail) errors.push('Please enter mail address');
   else if(!EmailValidator.validate(mail)) errors.push('Your mail is incorrect');
   else{
      const result = await _shop.doesUserExist('mail', mail);
      result ? errors.push('Mail is already taken') : null
   }

   /* PASSWORDS */
   const illegal = ['.', '<', '>', '='];
   let passess = true;

   if(pass.length < 5) errors.push('Password must contain minimum 4 characters')
   else{
      for(let char of illegal){
         if(pass.indexOf(char) !== -1){
            errors.push('Password cant contain: ". < > =" characters');
            passess = false;
            break;
         }
      }
   }
   if(passess) pass !== passconf ? errors.push('Passwords are different') : null;

   /* CHECKBOX */
   if(!check) errors.push('You must accept our T&S')

   /* CAPTCHA */
   const captchaVer:Object = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_CAPTCHA}&response=${captcha}`, { method: "POST" })
   .then((_res:Object) => _res.json())

   captchaVer.success ? null : errors.push('Please complete captcha')
    
   /**
    * AFTER VALIDATING
   */

   if(errors.length !== 0) return res.json({ bool: false, res: errors })

   const {salt, hash} = genHash(pass);

   const newUser = new User({
      username: user,
      mail: mail,
      salt: salt,
      hash: hash
   })
   
   const saved = await newUser.save();

   res.json({ bool: true, res: ['You have successfully registered.', 'You can login now.'] });
})

// AUTHENTICATE FAILED
router.get('/failed', (req,res) => {
   res.json({ result: false })
})

module.exports = router;