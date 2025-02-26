import express from 'express';
import Expenseservice from '../Services/Expenseservice.js';
const Expensecontroller=express.Router();
Expensecontroller.post('/add',Expenseservice.add);
Expensecontroller.get('/get',Expenseservice.get);
Expensecontroller.get('/get1',Expenseservice.get1);
Expensecontroller.get('/get2',Expenseservice.get2);
Expensecontroller.get('/get3',Expenseservice.get3);
Expensecontroller.get('/get4',Expenseservice.get4);
Expensecontroller.delete('/delete1',Expenseservice.delete1);
Expensecontroller.delete('/delete2',Expenseservice.delete2);

export default Expensecontroller