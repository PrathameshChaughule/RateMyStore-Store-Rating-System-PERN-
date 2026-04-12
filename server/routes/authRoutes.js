import express from 'express'
import { login, register } from '../controllers/authControllers.js'
import { userValidation } from '../middleware/validations.js'
const authRouter = express.Router()

// register
// /api/auth/register
authRouter.post('/register', userValidation, register)

// login
// /api/auth/login
authRouter.post('/login', login)


export default authRouter