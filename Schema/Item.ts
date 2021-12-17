import mongoose from 'mongoose';

const Item = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   price: {
      type: Number,
      required: true
   },
   img: {
      type: String,
      required: true
   }
})

module.exports = mongoose.model('Item', Item);