import express from 'express';
import { registrationUser } from '../controller/user.controller';

const userRoute=express.Router()


userRoute.post('/registration',registrationUser)


export default userRoute