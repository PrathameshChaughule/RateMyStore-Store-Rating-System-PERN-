import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import authRouter from './routes/authRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import userRouter from './routes/userRoutes.js'
import publicRouter from './routes/publicRoutes.js'
import ownerRouter from './routes/ownerRoutes.js'
const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json())

app.use("/api/public", publicRouter)
app.use("/api/auth", authRouter)
app.use("/api/admin", adminRouter)
app.use("/api/user", userRouter)
app.use("/api/owner", ownerRouter)


const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
 console.log(`Server is Up on port: ${PORT}`)
})