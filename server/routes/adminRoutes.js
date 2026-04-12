import express from 'express'
import { addStore, addUser, deleteUser, getStores, getUserById, getUsers, getUserStats, updateUser } from '../controllers/adminControllers.js'
import { userValidation } from '../middleware/validations.js'
import authMiddleware from '../middleware/authMiddleware.js'
import roleMiddleware from '../middleware/roleMiddleware.js'
const adminRouter = express.Router()

adminRouter.use(authMiddleware, roleMiddleware(["ADMIN"]))

// add User
// POST /api/admin/user
adminRouter.post('/user', userValidation, addUser)


// update user
// PUT /api/admin/user/:id
adminRouter.put('/user/:id', updateUser)


// delete user
// DELETE /api/admin/delete-user/:id
adminRouter.delete('/delete-user/:id', deleteUser)


// get count
// GET /api/admin/user-counts
adminRouter.get('/user-counts', getUserStats)



// add Store
// POST /api/admin/store
adminRouter.post('/store', addStore)


// get all users
// GET /api/admin/users
adminRouter.get('/users', getUsers)


// get one user
// GET /api/admin/user/:id
adminRouter.get('/user/:id', getUserById)


// get all stores
adminRouter.get('/stores', getStores)


export default adminRouter