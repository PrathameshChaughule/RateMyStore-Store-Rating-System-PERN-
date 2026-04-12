import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.status(401).json({message: "Unauthorized"})
    }

    const decoded = jwt.decode(token, process.env.JWT_SECRET)
    req.user = decoded

    next()
}

export default authMiddleware