import express from 'express';
import { activateUser, getUserInfo, loginUser, logoutUser, registrationUser, socialAuth, updateAccessToken, updateAvatar, updatePassword, updateUserInfo } from '../controller/User.controller';
import { authorizedRoles, isAuthenticated } from '../middleware/Auth.middleware';

const userRoute = express.Router()


userRoute.post('/registration', registrationUser)
userRoute.post('/activate-user', activateUser)
userRoute.post('/login', loginUser)
userRoute.post('/social-auth', socialAuth)

userRoute.get('/logout', isAuthenticated, logoutUser)
userRoute.get('/refresh-token', isAuthenticated, updateAccessToken)
userRoute.get('/me', isAuthenticated, getUserInfo)
userRoute.put('/update-user-info', isAuthenticated, updateUserInfo)
userRoute.put('/change-password', isAuthenticated, updatePassword)
userRoute.put('/update-profile-pic', isAuthenticated, updateAvatar)








export default userRoute