import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';
import { addRating, getStoreById, getStores, updateRating } from '../controllers/userControllers.js';
const userRouter = express.Router()

userRouter.use(authMiddleware, roleMiddleware(['USER','ADMIN','OWNER']))

userRouter.get("/stores", getStores);
userRouter.get("/stores/:id", getStoreById);
userRouter.post("/ratings", addRating);

export default userRouter