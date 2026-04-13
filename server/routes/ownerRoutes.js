import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import roleMiddleware from '../middleware/roleMiddleware.js'
import { getOwnerStoreDetails, getRatingSummary, getStoreRatingsForOwner } from '../controllers/ownerControllers.js'
const ownerRouter = express.Router()

ownerRouter.use(authMiddleware, roleMiddleware(['OWNER']))

// get Store Details
// GET /api/owner/store/:storeId
ownerRouter.get("/store", getOwnerStoreDetails);


// all Users who rated that store
// GET /api/owner/store/ratings
ownerRouter.get("/store/ratings", getStoreRatingsForOwner);


// count
// GET /api/owner/rating-summary
ownerRouter.get("/rating-summary", getRatingSummary)

export default ownerRouter