import express from 'express'
import authRoutes from './AuthRoutes'
import clientRoutes from './ClientRoutes'
import clientPaymentRoutes from './ClientPaymentRoutes'

const router = express.Router()

router.use("/auth", authRoutes)
router.use("/clients", clientRoutes)
router.use("/clientPayments", clientPaymentRoutes)

export default router