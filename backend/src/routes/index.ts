import express from 'express'
import authRoutes from './AuthRoutes'
import clientRoutes from './ClientRoutes'
import productRoutes from './ProductRoute'
import clientPaymentRoutes from './ClientPaymentRoutes'
import paymentsReportRoutes from './PaymentsReportRoutes'

const router = express.Router()

router.use("/auth", authRoutes)
router.use("/clients", clientRoutes)
router.use("/products", productRoutes)
router.use("/clientPayments", clientPaymentRoutes)
router.use("/paymentsReport", paymentsReportRoutes)

export default router