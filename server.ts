import express, { Request, Response } from 'express';
require('dotenv/config');

const app = express();

app.get('/', (req:Request,res:Response) => {
   res.send('main')
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))