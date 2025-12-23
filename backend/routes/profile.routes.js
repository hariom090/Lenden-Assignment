import express from 'express'
import authMiddleware from '../middleware/auth.middleware.js'
import { getProfile } from '../controllers/profile.controller.js'

const router = express.Router()

router.get('/', authMiddleware, getProfile)

export default router
