import bcrypt from 'bcryptjs'
import con from '../config/db.js'
import jwt from 'jsonwebtoken'
import otpEmail from '../config/email.js'

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



// email verify and otp generate
// POST /api/auth/forgot-password
const otpStore = new Map();
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await con.query(
      "SELECT id, email FROM users WHERE email=$1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "Email not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 min
    });

    await otpEmail(email, otp)

    return res.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};



// verify Otp
// POST /api/auth/verify-otp
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = otpStore.get(email);

    if (!record) {
      return res.status(400).json({ message: "OTP not found" });
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ message: "OTP expired" });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    return res.json({
      success: true,
      message: "OTP verified",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};



// reset password
// POST /api/auth/reset-password
export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const record = otpStore.get(email);

    const hashed = await bcrypt.hash(password, 10);

    await con.query(
      "UPDATE users SET password=$1 WHERE email=$2",
      [hashed, email]
    );

    otpStore.delete(email);

    return res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};