import { ClientSession } from "mongoose";
import { IdType } from "../types/IdType";
import { getClientById } from "../../services/ClientService";
import { ResourceNotFoundError } from "../../errors/CustomErros";
import { SaleModel } from "../../models";
import { SaleMongoType } from "../../schemas/SaleSchema";


/////////////////////////
// SALE UTILS
/////////////////////////

const addSaleToClient = async (clientId: IdType, saleId: IdType, session: ClientSession) => {
    try {
        const client = await getClientById(clientId, session) // FIND CLIENT WITH SESSION AND CLIENT SERVICE, CHECK IF EXISTS OR RUN AN EXCEPTION
        if(!client) {
            throw new ResourceNotFoundError('Cliente')
        }
       const sale = await SaleModel.findById(saleId).session(session)// FIND CLIENT PAYMENT WITH SESSION, CHECK IF EXISTS OR RUN AN EXCEPTION
       if(!sale) {
            throw new ResourceNotFoundError('Venta')
       }
       if(client.sales && client.balance && sale.total_sale !== undefined) {
            const saleForClient = {
                ...sale.toObject(),
                _id: sale._id.toString()
            }
            client.sales.push(saleForClient._id) // ADD PAYMENT TO CLIENT LIST OF PAYMENTS
            client.balance += sale.total_sale // UPDATE THE CLIENT BALANCE
            await client.save({session})
       }
    } catch(e){
        throw e
    }
}

const removeSaleToClient = async (clientId: IdType, saleId: IdType, session: ClientSession) => {
    try {
        const client = await getClientById(clientId, session) // FIND CLIENT WITH SESSION AND CLIENT SERVICE, CHECK IF EXISTS OR RUN AN EXCEPTION
        if(!client) {
            throw new ResourceNotFoundError('Cliente')
        }
       const sale = await SaleModel.findById(saleId).session(session)// FIND CLIENT PAYMENT WITH SESSION, CHECK IF EXISTS OR RUN AN EXCEPTION
       if(!sale) {
            throw new ResourceNotFoundError('Venta')
       }
       if(client.sales && client.balance && sale.total_sale !== undefined) {
            const saleForClient = {
                ...sale.toObject(),
                _id: sale._id.toString()
            }
            client.sales = client.sales.filter(sale => sale != saleForClient._id) // ADD PAYMENT TO CLIENT LIST OF PAYMENTS
            client.balance -= sale.total_sale // UPDATE THE CLIENT BALANCE
            await client.save({session})
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
                const client = await getClientById(sale.client_id, undefined);
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

export { addSaleToClient, removeSaleToClient, filterSaleForDelivery }