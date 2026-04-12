import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import roleMiddleware from '../middleware/roleMiddleware.js'
import { ownerDashboard } from '../controllers/ownerControllers.js'
const ownerRouter = express.Router()

ownerRouter.use(authMiddleware, roleMiddleware(['OWNER']))


ownerRouter.get('/dashboard', ownerDashboard)

export default ownerRouter