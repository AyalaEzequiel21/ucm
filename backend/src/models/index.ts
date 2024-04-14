import { model } from 'mongoose';
import { userSchema } from './UserModel';
import { supplierSchema } from './SupplierModel';
import { saleSchema } from './SaleModel';
import { purchaseSchema } from './PurchaseModel';
import { productSchema } from './ProductModel';
import { paymentToSupplierSchema } from './PaymentToSupplierModel';
import { paymentsReportSchema } from './PaymentsReportModel';
import { clientPaymentSchema } from './ClientPaymentModel';
import { clientSchema } from './ClientModel';

const UserModel = model("User", userSchema, "users")
const SupplierModel = model("Supplier", supplierSchema, "suppliers")
// const SalesListModel = model("SalesList", salesListSchema, "salesLists")
const SaleModel = model("Sale", saleSchema, "sales")
const PurchaseModel = model("Purchase", purchaseSchema, "purchases")
const ProductModel = model("product", productSchema, "products")
const PaymentToSupplierModel = model("PaymentToSupplier", paymentToSupplierSchema, "paymentsToSuppliers")
const PaymentsReportModel = model("PaymentsReport", paymentsReportSchema, "paymentsReports")
const ClientPaymentModel = model("ClientPayment", clientPaymentSchema, "clientPayments")
const ClientModel = model("Client", clientSchema, "clients")

export { UserModel, SupplierModel, SaleModel, PurchaseModel, ProductModel, PaymentToSupplierModel, PaymentsReportModel, ClientModel, ClientPaymentModel }


