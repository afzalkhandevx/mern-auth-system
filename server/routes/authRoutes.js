import express from 'express'
import { register, login, logout, sendverifyOtp, verifyEmail, sendResetOtp, resetPassword, refreshAccessToken } from '../controllers/authcontroller.js';
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/refresh', refreshAccessToken);
authRouter.post('/send-verify-otp', userAuth, sendverifyOtp);
authRouter.post('/verify-account', userAuth, verifyEmail);
authRouter.post('/send-reset-otp', sendResetOtp);
authRouter.post('/reset-password', resetPassword);

export default authRouter;