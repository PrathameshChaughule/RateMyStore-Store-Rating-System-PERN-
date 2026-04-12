import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import authRouter from './routes/authRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import userRouter from './routes/userRoutes.js'
const app = express()

app.use(cors())
app.use(express.json())


app.use("/api/auth", authRouter)
app.use("/api/admin", adminRouter)
app.use("/api/user", userRouter)


const PORT = 3000
app.listen(PORT, ()=>{
 console.log(`Server is Up on port: ${PORT}`)
})