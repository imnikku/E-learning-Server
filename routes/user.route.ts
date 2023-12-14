import express from 'express';
import { activateUser, getUserInfo, loginUser, logoutUser, registrationUser, updateAccessToken } from '../controller/user.controller';
import { authorizedRoles, isAuthenticated } from '../middleware/auth';

const userRoute=express.Router()


userRoute.post('/registration',registrationUser)
userRoute.post('/activate-user',activateUser)
userRoute.post('/login',loginUser)
userRoute.get('/logout',isAuthenticated,logoutUser)
userRoute.get('/refresh-token',isAuthenticated,updateAccessToken)
userRoute.get('/me',isAuthenticated,getUserInfo)



export default userRoute