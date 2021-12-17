import express, { Request, Response } from 'express';
const router = express.Router();
import { Database } from '../Database';
const _shop = new Database(process.env.MONGO!, { useNewUrlParser: true });

router.get('/search/:str', async (req:Request,res:Response) => { // SEARCH RESULTS
   try{
      const item = await _shop.viewAll({ byWhat: 'name', str: req.params.str });
      res.json(item);
   }catch(err:any){
      console.log(err)
   }
})

router.get('/products/:id', async (req:Request,res:Response) => { // GET ONE
   try{
      const item = await _shop.viewOne(req.params.id);
      res.json(item);
   }catch(err:any){
      res.status(404).end();
   }
})

router.get('/', async (req:Request, res:Response) => { // GET ALL
   try{
      const it = await _shop.viewAll();
      res.json(it)
   }catch(err:any){
      throw err;
   }
})

module.exports = router;