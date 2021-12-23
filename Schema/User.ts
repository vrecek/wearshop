import mongoose from 'mongoose';

const User = new mongoose.Schema({
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
})

module.exports = mongoose.model('User', User);