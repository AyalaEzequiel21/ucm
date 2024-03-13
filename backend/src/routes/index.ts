import express from 'express'
import authRoutes from './AuthRoutes'
import clientRoutes from './ClientRoutes'

const router = express.Router()

router.use("/auth", authRoutes)
router.use("/clients", clientRoutes)

export default router