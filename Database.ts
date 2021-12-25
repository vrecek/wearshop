import mongoose from 'mongoose';
const Item = require('./Schema/Item');
const User = require('./Schema/User');
const passport = require('passport');
interface Object {
   [key:string]: any
}

export class Database {
   private uri:string;
   private options?:Object;

   public constructor(uri:string, options?:Object){
      this.uri = uri;
      this.options = options ? options : {};
   }

   public async connect():Promise<void>{
      await mongoose.connect(this.uri, this.options);
      console.log('Connected to Database')    
   }

   public async viewOne(id:string):Promise<Object>{
      try{
         const item = await Item.findById(id);
         return item;
      }catch(err){
         const error:NodeJS.ErrnoException = new ReferenceError(`Product with id ${id} does not exist`);
         error.code = '404';
         throw error;       
      }   
   }

   public async viewAll(opt?:{ byWhat: string | undefined, str: string | undefined }):Promise<Object>{
      if(!opt){
         const items = await Item.find();
         return items;
      } 

      const regex = new RegExp(opt.str!, 'i');
      const items = await Item.find({ [opt.byWhat!]: regex }, null, { limit: 5 });

      if(!(`${opt.byWhat}` in items[0])){
         const error:NodeJS.ErrnoException = new ReferenceError(`byWhat '${opt.byWhat}' option is incorrect! Check your DB document keys.`);
         error.code = '406';
         throw error;
      }

      return items;   
   }

   public async doesUserExist(field:string, str:string):Promise<boolean>{
      const it = await User.find({ [field]: str }, null, { limit: 1 });

      return it.length !== 0;
   }
}

const _shop = new Database(process.env.MONGO!, { useNewUrlParser: true });
export default _shop;