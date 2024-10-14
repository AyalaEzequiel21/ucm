import { getPurchasesOfSupplierForDetails } from "./PurchaseUtils"


/////////////////////////
// SUPPLIER UTILS
/////////////////////////


const getPurchasesAndPaymentsOfSupplier = async (supplierId: IdType) => {
    const purchases = await getPurchasesOfSupplierForDetails(supplierId)
    return {purchases: supplier?.purchases, payments: supplier?.payments}
}