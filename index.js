import express from 'express'
import cors from 'cors'
import controller from './Controller/index.js';
import 'dotenv/config.js';
const app=express();
app.use(express.json());
app.use(cors());
app.use(controller)
const port=8000;
app.listen(port,()=>{
console.log(`App is running at the port ${port}`);
})