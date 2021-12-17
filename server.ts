import express, { Request, Response } from 'express';
import path from 'path';
require('dotenv').config({path: path.join(__dirname, '../.env')});
import { Database } from './Database';
const _shop = new Database(process.env.MONGO!, { useNewUrlParser: true });
_shop.connect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/items', require('./Routes/items'));
app.use('/mailer', require('./Routes/mailer'));

app.get('/', (req:Request,res:Response):void => {
   res.send('xfd')
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`))