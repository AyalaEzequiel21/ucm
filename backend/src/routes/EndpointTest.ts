import express from "express"
import { findActivesClients } from "../controllers/ClientController"
import { findAllUsers } from "../controllers/AuthController"
import { findAllSuppliers } from "../controllers/SupplierController"
import { findAllClientsPayments } from "../controllers/ClientPaymentController"
import { findAllSales } from "../controllers/SaleController"
import { findAllPurchases } from "../controllers/PurchaseController"
import { findAllProducts } from "../controllers/ProductController"
import { findAllPaymentsToSupplier } from "../controllers/PaymentToSupplierController"
import { findAllPaymentsReport } from "../controllers/PaymentsReportController"


const router = express.Router()

router.get("/getClients", findActivesClients)
router.get("/getUsers", findAllUsers)
router.get("/getSuppliers", findAllSuppliers)
router.get("/getPayments", findAllClientsPayments)
router.get("/getSales", findAllSales)
router.get("/getPurchases", findAllPurchases)
router.get("/getProducts", findAllProducts)
router.get("/getPaymentsToSupplier", findAllPaymentsToSupplier)
router.get("/getPaymentsReports", findAllPaymentsReport)

export default router