import express from 'express'
import { forgotPassword, login, register, resetPassword, verifyOtp } from '../controllers/authControllers.js'
import { userValidation } from '../middleware/validations.js'
const authRouter = express.Router()

// register
// /api/auth/register
authRouter.post('/register', userValidation, register)

// login
// /api/auth/login
authRouter.post('/login', login)


// email verify and otp generate
// POST /api/auth/forgot-password
authRouter.post('/forgot-password', forgotPassword)


// verify Otp
// POST /api/auth/verify-otp
authRouter.post('/verify-otp', verifyOtp)


// reset password
// POST /api/auth/reset-password
authRouter.post('/reset-password', resetPassword)


export default authRouter