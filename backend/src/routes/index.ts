import express from "express";
import authRoutes from "./AuthRoutes";
import clientRoutes from "./ClientRoutes";
import productRoutes from "./ProductRoute";
import clientPaymentRoutes from "./ClientPaymentRoutes";
import paymentsReportRoutes from "./PaymentsReportRoutes";
import saleRoutes from "./SaleRoutes";
import supplierRoutes from "./SupplierRoutes";
import purchaseRoutes from "./PurchaseRoutes";
import paymentToSupplierRoutes from "./PaymentToSupplierRoutes";
import endpointTestRoutes from "./EndpointTest"

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/clients", clientRoutes);
router.use("/products", productRoutes);
router.use("/clientPayments", clientPaymentRoutes);
router.use("/paymentsReport", paymentsReportRoutes);
router.use("/sales", saleRoutes);
router.use("/suppliers", supplierRoutes);
router.use("/purchases", purchaseRoutes);
router.use("/paymentsToSupplier", paymentToSupplierRoutes);
router.use("/endpointTest", endpointTestRoutes);

export default router;
