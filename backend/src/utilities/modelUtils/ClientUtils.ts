import { ClientSession } from "mongoose";
import { IdType } from "../types/IdType";
import { getClientSalesForDetails } from "./SaleUtils";
import { getClientPaymentsForDetails } from "./ClientPaymentUtils";
import { IPaymentsOfClientDetails, ISalesOfClientDetails } from "../interfaces/IClientDetails";

/////////////////////////
// CLIENT UTILS
/////////////////////////

// GET SALES AND PAYMENT OF CLIENT BY ID    
const getSalesAndPaymentOfClientById = async (clientId: IdType) => {
    try{
        const clientSales: ISalesOfClientDetails[] = await getClientSalesForDetails(clientId)
        const clientPayments: IPaymentsOfClientDetails[] = await getClientPaymentsForDetails(clientId)
        return {clientSales, clientPayments}
    } catch(e) {
        throw e 
    }
}

export { getSalesAndPaymentOfClientById }