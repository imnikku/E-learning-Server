import express from 'express';
import { activateUser, getUserInfo, loginUser, logoutUser, registrationUser, socialAuth, updateAccessToken, updateAvatar, updatePassword, updateUserInfo } from '../controller/User.controller';
import { authorizedRoles, isAuthenticated } from '../middleware/Auth.middleware';
import { LoginValidator } from '../validator/Login.validator';

const userRoute = express.Router()


userRoute.post('/registration', registrationUser)
userRoute.post('/activate-user', activateUser)
userRoute.post('/login',LoginValidator, loginUser)
userRoute.post('/social-auth', socialAuth)

userRoute.get('/logout', isAuthenticated, logoutUser)
userRoute.get('/refresh-token', isAuthenticated, updateAccessToken)
userRoute.get('/me', isAuthenticated, getUserInfo)
userRoute.put('/update-user-info', isAuthenticated, updateUserInfo)
userRoute.put('/change-password', isAuthenticated, updatePassword)
userRoute.put('/update-profile-pic', isAuthenticated, updateAvatar)








export default userRoute