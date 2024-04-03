import { startSession } from "../config/startSession";
import { BadRequestError, ResourceNotFoundError } from "../errors/CustomErros";
import { ErrorsPitcher } from "../errors/ErrorsPitcher";
import { SaleModel } from "../models";
import { SaleMongoType, SaleType } from "../schemas/SaleSchema";
import { convertDateString, validateDate } from "../utilities/datesUtils";
import { processOnePayment } from "../utilities/modelUtils/ClientPaymentUtils";
import { addSaleToClient, filterSaleForDelivery, removeSaleToClient } from "../utilities/modelUtils/SaleUtils";
import { IdType } from "../utilities/types/IdType";
import { getClientById } from "./ClientService";

/////////////////////////
// SALE SERVICE
///////////////////////

// CREATE 
const createSale = async (sale: SaleType) => {
    const { client_id, client_name, details, payment_dto } = sale // GET THE DATA FOR CREATE THE SALE
    const session = await startSession() // INIT A SESSION 
    if(!client_id || !details || !client_name){
        throw new BadRequestError('Faltan algunos datos necesarios')
    }
    try {
        session.startTransaction() // START A TRANSACTION
        const client = await getClientById(client_id, session) // FIND THE CLIENT WITH HIS ID
        if(!client){ // IF CLIENT IS NOT FOUND, RUN AN EXCELTION
            throw new ResourceNotFoundError('Cliente')
        }
        const saleCreated = await SaleModel.create([{ // REGISTER THE NEW SALE
            client_id: client_id,
            client_name: client_name,
            details: details
        }], {session})

        const { _id, total_sale } = saleCreated[0] // GET THE ID AND TOTAL_SALE FROM THE SALE CREATED
        if(total_sale !== undefined){
            await addSaleToClient(client_id, _id.toString(), session) // IF TOTAL SALE IS NOT UNDEFINED, THEN ADD THE SALE TO CLIENT AND UPDATE THE BALANCE
        }
        if(payment_dto && payment_dto.client_id === client_id){ // IF THE SALE HAS A PAYMENT, THEN PROCESS IT
            const paymentCreated = await processOnePayment(payment_dto, undefined, _id.toString(), session)
            saleCreated[0].payment_id = paymentCreated // AFTER REGISTER THE PAYMENT, ADD HIS ID TO SALE CREATED
        }
        await saleCreated[0].save({session})
        await session.commitTransaction() // CONFIRM ALL CHANGES AND THE TRANSACTION
    } catch(e) {
        await session.abortTransaction() //ABORT THE TRANSACTION
        ErrorsPitcher(e)
    } finally {
        await session.endSession() // END THE SESSION
    }
}

// UPDATE
const modifySale = async (saleUpdated: SaleMongoType) => {
    const {_id, details, client_id} = saleUpdated // GET THE ID AND DETAILS FOR UPDATE THE SALE
    const session = await startSession() // INIT A SESSION
    if(!_id || !details || !client_id){
        throw new BadRequestError('Faltan algunos datos necesarios')
    }
    try {
        session.startTransaction() // START A TRANSACTION
        const client = await getClientById(client_id, session) // FIND THE CLIENT WITH HIS ID
        if(!client){ // IF CLIENT IS NOT FOUND, RUN AN EXCELTION
            throw new ResourceNotFoundError('Cliente')
        }
        const saleSaved = await SaleModel.findById(_id).session(session) // FIND THE SALE, IF NOT EXISTS RUN AN EXCEPTION
        if(!saleSaved) { 
            throw new ResourceNotFoundError('Venta')
        }
        removeSaleToClient(client_id, _id, session) // REMOVE THE SALE WITH OLD TOTAL SALE
        saleSaved.details = details // UPDATE THE DETAILS SALE
        saleSaved.save({session}) // SAVE THE UPDATED SALE
        addSaleToClient(client_id, _id, session) // ADD THE SALE WITH NEW TOTAL SALE TO CLIENT
        await session.commitTransaction() // CONFIRM ALL CHANGES AND THE TRANSACTION
    } catch(e) {
        await session.abortTransaction() //ABORT THE TRANSACTION
        ErrorsPitcher(e)
    } finally {
        await session.endSession() // END THE SESSION
    }
}

// GET ALL
const getAllSales = async (inDelivery: boolean) => {
    try {
        const sales: SaleMongoType[] = await SaleModel.find()//  FIND ALL SALES
        if(inDelivery){
            const salesFiltered = filterSaleForDelivery(sales)
            return salesFiltered
        }
        return sales
    }catch(e) {
        ErrorsPitcher(e)
    }
}

// GET BY ID
const getSaleById = async (saleId: IdType) => {
    try {
        const sale = await SaleModel.findById(saleId) //  FIND THE SALE BY HIS ID
        if(!sale) { // CHECK IF EXISTS THE SALE OR RUN AN EXCEPTION
            throw new ResourceNotFoundError('Venta')
        }
        return sale
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// GET BY CLIENT NAME
const getSalesByClientName = async (inDelivery: boolean, clientName: string) => {
    try {
        const sales: SaleMongoType[] = await SaleModel.find({ fullname: { $regex: clientName, $options: 'i' } }) // FIND ALL SALE WITH CLIENT NAME
        if(inDelivery){
            const salesFiltered = filterSaleForDelivery(sales) // IF INDELIVERY IS TRUE, THEN FILTERED THE SALES
            return salesFiltered
        }
        return sales
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// GET BY SALE DATE
const getSalesByDate = async (inDelivery: boolean, date: string) => {
    if(!validateDate(date)){ // CHECK THAT DATE IS VALID FORMAT OR RUN AN EXCEPTION
        throw new BadRequestError('Datos ingresados no son validos')
    }
    const newFormatDate = convertDateString(date) // CONVERT THE DATE STRING TO DATE WITH VALID FORMAT
    try {
        const salesFound: SaleMongoType[] = await SaleModel.find({createdAt: newFormatDate}) // FIND ALL SALES WITH THIS DATE
        if(inDelivery){
            const salesFiltered = filterSaleForDelivery(salesFound) // IF INDELIVERY IS TRUE, THEN FILTERED THE SALES, AND RETURN IT
            return salesFiltered
        }
        return salesFound
    } catch(e) {
        ErrorsPitcher(e)
    }
}

export { createSale, modifySale, getAllSales, getSaleById, getSalesByClientName, getSalesByDate }