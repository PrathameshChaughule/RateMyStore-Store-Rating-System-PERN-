import bcrypt from 'bcryptjs'
import con from '../config/db.js'
import jwt from 'jsonwebtoken'

// /api/auth/register
export const register = async (req, res) => {
    try {
        const { name, email, password, address } = req.body

        const hashPassword = await bcrypt.hash(password, 10)
        const result = await con.query(`INSERT INTO users (name, email, password, address, role) VALUES ($1, $2, $3, $4, 'USER') RETURNING *`,
            [name, email, hashPassword, address]
        )

        return res.status(201).json({
            success: true,
            message: "Successfully User Added"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// /api/auth/login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await con.query(`SELECT * FROM users WHERE email=$1`, [email])

        if (!user.rows.length) {
            return res.status(404).json({ message: "User Not Found" })
        }

        const verify = await bcrypt.compare(password, user.rows[0].password)
        if (!verify) {
            return res.status(404).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign({ id: user.rows[0].id, role: user.rows[0].role, name: user.rows[0].name }, process.env.JWT_SECRET, { expiresIn: '1d' })
        user.rows[0].password = undefined
        return res.status(200).json({
            message: "Successfully login",
            token: token,
            user: user.rows[0]
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}