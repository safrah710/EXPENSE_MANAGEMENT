import express from 'express'
const controller=express.Router();
import UserController from './Usercontroller.js';
import Expensecontroller from './Expensecontroller.js';
controller.use('/user',UserController)
controller.use('/exp',Expensecontroller)
export default controller;