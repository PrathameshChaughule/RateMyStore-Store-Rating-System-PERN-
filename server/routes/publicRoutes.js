import express from 'express'
import { getTrendingStores } from '../controllers/publicControllers.js'

const publicRouter = express.Router()


publicRouter.get('/trending-stores', getTrendingStores)


export default publicRouter