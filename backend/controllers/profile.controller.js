import User from '../models/User.js'
import { decrypt } from '../utils/encrypt.js'

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({
      name: user.name,
      email: user.email,
      aadhaar: decrypt(user.aadhaar),
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}
