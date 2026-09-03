import { Router } from 'express'
import { registerUserController, verifyEmailContrroller,loginController,
    logOutControllers,uploadAvatar,updateUsersDetails,forgotPasswordController,verifyForgotPasswordOtp,resetPassword, refreshTokenn, userDetails } from "../controllers/user.controllers.js"

import auth from '../middlewere/auth.js'
import upload from "../middlewere/multer.js"
const userRouter = Router()

userRouter.post('/register',registerUserController)
userRouter.post('/verify-email',verifyEmailContrroller)
userRouter.post('/login',loginController)
userRouter.get('/logout',auth,logOutControllers)
userRouter.put('/upload-avatar',auth, upload.single('avatar'),uploadAvatar)
userRouter.put('/update-user',auth,updateUsersDetails)
userRouter.put('/forgot-password',forgotPasswordController)
userRouter.put('/verify-forgot-password-otp',verifyForgotPasswordOtp)
userRouter.put('/reset-password',resetPassword)
userRouter.post('/refresh-token',refreshTokenn)
userRouter.get('/user-details',auth,userDetails)


export default userRouter;


