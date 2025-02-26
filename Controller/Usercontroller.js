import express from 'express';
const UserController=express.Router();
import UserService from '../Services/UserService.js';
UserController.post('/signup',UserService.create_login);
UserController.post('/login',UserService.login);
export default UserController