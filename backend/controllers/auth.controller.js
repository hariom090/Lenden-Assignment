import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { encrypt } from '../utils/encrypt.js'

export const register = async (req, res) => {
  try {
    const { name, email, password, aadhaar } = req.body

    // ✅ Aadhaar validation
    if (!aadhaar) {
      return res.status(400).json({ message: 'Aadhaar is required' })
    }

    if (!/^\d{12}$/.test(aadhaar)) {
      return res.status(400).json({
        message: 'Aadhaar must be exactly 12 digits and numeric',
      })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const encryptedAadhaar = encrypt(aadhaar)

    await User.create({
      name,
      email,
      password: hashedPassword,
      aadhaar: encryptedAadhaar,
    })

    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}


export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Check email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        field: 'email',
        message: 'Email not registered',
      })
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({
        field: 'password',
        message: 'Incorrect password',
      })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.json({ token })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

