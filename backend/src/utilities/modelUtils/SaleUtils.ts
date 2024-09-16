import { ClientSession } from "mongoose";
import { IdType } from "../types/IdType";
import { getClientById } from "../../services/ClientService";
import { ResourceNotFoundError } from "../../errors/CustomErros";
import { SaleModel } from "../../models";
import { SaleMongoType } from "../../schemas/SaleSchema";
import { ISalesOfClientDetails } from "../interfaces/IClientDetails";
import { getClientPaymentBySaleId } from "../../services/ClientPaymentService";
import { ClientPaymentType } from "../../schemas/ClientPaymentSchema";
import { processPaymentOfSale } from "./ClientPaymentUtils";


/////////////////////////
// SALE UTILS
/////////////////////////

const addSaleToClient = async (clientId: IdType, sale: SaleMongoType, session: ClientSession) => {
    try {
        const client = await getClientById(clientId) // FIND CLIENT WITH SESSION AND CLIENT SERVICE, CHECK IF EXISTS OR RUN AN EXCEPTION
        if(client) {
            client.sales?.push(sale._id) // ADD PAYMENT TO CLIENT LIST OF PAYMENTS
            client.balance += sale.total_sale || 0 // UPDATE THE CLIENT BALANCE
            await client.save({session})
        }
    } catch(e){
        throw e
    }
}

const removeSalefromClient = async (clientId: IdType, saleId: IdType, totalSale: number, session: ClientSession) => {
    try {
        const client = await getClientById(clientId) // FIND CLIENT WITH CLIENT SERVICE, CHECK IF EXISTS ASND UPDATE IT
        if(client && client.sales && client.balance) {
            client.sales = client.sales.filter(sale => sale != saleId) // SUBTRACT SALE TO CLIENT LIST OF SALES
            client.balance -= totalSale // UPDATE THE CLIENT BALANCE
            await client.save({session})        
        }
    } catch(e){
        throw e
    }
}

const addDifferenceToBalanceClient = async (clientId: IdType, difference: number, session: ClientSession) => {
    try {
        const client = await getClientById(clientId) // FIND THE CLIENT 
        if(client){
            client.balance += difference
            await client.save({session}) // SAVE THE CLIENT UPDATED
        }
    } catch(e){
        throw e
    }
}

const filterSaleForDelivery = async (sales: SaleMongoType[]) => {
    try {
        const deliverySales = [];
        for (const sale of sales) {
            if (sale.client_id) {
                const client = await getClientById(sale.client_id);
                if (client && client.in_delivery) {
                    deliverySales.push(sale);
                }
            }
        }
        return deliverySales;
    } catch(e) {
        throw e
    }
}

const getClientSalesForDetails = async (clientId: IdType) => {
    try {
        const sales = await SaleModel.find({ client_id: clientId }) //  FIND CLIENT'S SALES BY CLIENT ID
            .select('_id total_sale createdAt') 
            .lean<ISalesOfClientDetails[]>() 

        return sales
    } catch (e) {
        throw e
    }
}

const getClientPaymentOfSale = async (saleId: IdType) => {
    try {
        const payment = await getClientPaymentBySaleId(saleId) // FIND CLIENT'S PAYMENT BY SALE ID
        return payment
    } catch(e) {
        throw(e)
    }
}

const processClientPayment = async (clientPayment: ClientPaymentType, saleID: IdType, session: ClientSession) => {
    try{
        const newCLientPayment = await processPaymentOfSale(clientPayment, saleID, session) // CREATE CLIENT PAYMENT
        return newCLientPayment
    } catch(e) {
        throw e
    }
}

export { addSaleToClient, removeSalefromClient, filterSaleForDelivery, addDifferenceToBalanceClient, getClientSalesForDetails, getClientPaymentOfSale, processClientPayment}