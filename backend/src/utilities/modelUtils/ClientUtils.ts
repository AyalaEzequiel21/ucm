import { IdType } from "../types/IdType";
import { getClientSalesForDetails } from "./SaleUtils";
import { getClientPaymentsForDetails } from "./ClientPaymentUtils";
import { IPaymentsOfClientDetails, ISalesOfClientDetails } from "../interfaces/IClientDetails";
import { getClientById } from "../../services/ClientService";

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

const validateClient = async (clientId: IdType) => {
    const client = await getClientById(clientId)
    return !!client
}

const getTheClientBalance = async (clientId: IdType) => {
    const client = await getClientById(clientId)
    return client?.balance
}

export { getSalesAndPaymentOfClientById, validateClient, getTheClientBalance }