import express from 'express'
import authRoutes from './AuthRoutes'
import clientRoutes from './ClientRoutes'
import productRoutes from './ProductRoute'
import clientPaymentRoutes from './ClientPaymentRoutes'
import paymentsReportRoutes from './PaymentsReportRoutes'
import saleRoutes from './SaleRoutes'
import supplierRoutes from './SupplierRoutes'

const router = express.Router()

router.use("/auth", authRoutes)
router.use("/clients", clientRoutes)
router.use("/products", productRoutes)
router.use("/clientPayments", clientPaymentRoutes)
router.use("/paymentsReport", paymentsReportRoutes)
router.use("/sales", saleRoutes)
router.use('/suppliers', supplierRoutes)

export default router