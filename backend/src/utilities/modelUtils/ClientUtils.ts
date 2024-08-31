import { ClientSession } from "mongoose";
import { IdType } from "../types/IdType";
import { getClientSalesForDetails } from "./SaleUtils";
import { getClientPaymentsForDetails } from "./ClientPaymentUtils";

/////////////////////////
// CLIENT UTILS
/////////////////////////

// GET SALES AND PAYMENT OF CLIENT BY ID    
const getSalesAndPaymentOfClientById = async (clientId: IdType, session: ClientSession) => {
    try{
        const clientSales = await getClientSalesForDetails(clientId, session)
        const clientPayments = await getClientPaymentsForDetails(clientId, session)
        return {clientSales, clientPayments}
    } catch(e) {
        throw e 
    }
}

export { getSalesAndPaymentOfClientById }