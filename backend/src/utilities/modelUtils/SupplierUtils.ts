import { IPaymentsOfSupplierDetails, IPurchasesOfSupplierDetails } from "../interfaces/ISupplierDetails"
import { IdType } from "../types/IdType"
import { getPaymentsToSupplierForDetails } from "./PaymentToSupplierUtils"
import { getPurchasesOfSupplierForDetails } from "./PurchaseUtils"


/////////////////////////
// SUPPLIER UTILS
/////////////////////////


const getPurchasesAndPaymentsOfSupplier = async (supplierId: IdType) => {
    const purchases: IPurchasesOfSupplierDetails[] = await getPurchasesOfSupplierForDetails(supplierId)
    const payments: IPaymentsOfSupplierDetails[] = await getPaymentsToSupplierForDetails(supplierId)

    return {supplierPurchases: purchases, supplierPayments: payments}
}
export { getPurchasesAndPaymentsOfSupplier }