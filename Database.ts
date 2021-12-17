import mongoose from 'mongoose';
const Item = require('./Schema/Item');
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
}