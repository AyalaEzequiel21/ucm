import { startSession } from "../config/startSession";
import { BadRequestError, ResourceNotFoundError } from "../errors/CustomErros";
import { ErrorsPitcher } from "../errors/ErrorsPitcher";
import { SaleModel } from "../models";
import { SaleMongoType, SaleType } from "../schemas/SaleSchema";
import { convertDateString, validateDate } from "../utilities/datesUtils";
import { IDetailsOfSale, IPaymentOfSale, ISaleDetails } from "../utilities/interfaces/ISaleDetails";
import { addPaymentToClient } from "../utilities/modelUtils/ClientPaymentUtils";
import { addDifferenceToBalanceClient, addSaleToClient, filterSaleForDelivery, getClientPaymentOfSale, processClientPayment, removeSaleToClient } from "../utilities/modelUtils/SaleUtils";
import { IdType } from "../utilities/types/IdType";
import { checkId } from "../utilities/validateObjectId";
import { getClientById } from "./ClientService";

/////////////////////////
// SALE SERVICE
///////////////////////

// CREATE 
const createSale = async (sale: SaleType) => {
    const { client_id, client_name, details } = sale // GET THE DATA FOR CREATE THE SALE
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
        if(sale.payment){
            const payment = await processClientPayment(sale.payment)
            console.log(payment)
        }
        console.log(saleCreated)
        await addSaleToClient(client_id, _id.toString(), session) // IF TOTAL SALE IS NOT UNDEFINED, THEN ADD THE SALE TO CLIENT AND UPDATE THE BALANCE
        await session.commitTransaction() // CONFIRM ALL CHANGES AND THE TRANSACTION
        return saleCreated[0]
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
        const saleSaved = await SaleModel.findById(_id).session(session) // FIND THE SALE, IF NOT EXISTS RUN AN EXCEPTION
        if(!saleSaved) { 
            throw new ResourceNotFoundError('Venta')
        }
        const oldTotal = saleSaved.total_sale // GET OLD TOTAL SALE
        saleSaved.details = details // UPDATE THE DETAILS SALE
        await saleSaved.save({session}) // SAVE THE UPDATED SALE
        if(oldTotal !== undefined && saleSaved.total_sale !== undefined){
            const difference = saleSaved.total_sale - oldTotal // CALCULATE THE DIFFERENCE BEETWEN OLD TOTAL SALE AND THE NEW TOTAL
            difference !== 0 && await addDifferenceToBalanceClient(client_id, difference, session) // ADD DIFFERENCE TO CLIENT BALANCE
        }
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
        const sales: SaleMongoType[] = await SaleModel.find().lean() //  FIND ALL SALES
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
    checkId(saleId)
    try {
        const sale = await SaleModel.findById(saleId).lean() //  FIND THE SALE BY HIS ID
        if(!sale) { // CHECK IF EXISTS THE SALE OR RUN AN EXCEPTION
            throw new ResourceNotFoundError('Venta')
        }
        return sale
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// GET SALE FOR DETAILS BY ID
const getSaleForDetailsById = async (saleId: IdType) => {
    checkId(saleId)
    try {
        const sale = await SaleModel.findById(saleId).lean() //  FIND THE SALE BY HIS ID
        if(!sale) { // CHECK IF EXISTS THE SALE OR RUN AN EXCEPTION
            throw new ResourceNotFoundError('Venta')
        }
        const paymentOfSale = await getClientPaymentOfSale(saleId) //  GET PAYMENT OF SALE
        if(paymentOfSale && sale.client_id && sale.createdAt && sale.total_sale) { // CHECK IF PAYMENT OF SALE EXISTS
            const saleWithPayment: ISaleDetails = {  // CREATE A SALE DETAILS OBJECT WITH ALL PROPERTIES
                ...sale,
                _id: sale._id.toString(),
                payment: paymentOfSale,
                details: sale.details as IDetailsOfSale[],
                total_sale: sale.total_sale | 0,
                totalQuantity: sale.details.reduce((total, payment) => total + payment.quantity, 0),
                createdAt: sale.createdAt.toString()
            }
            return saleWithPayment
        }
        return sale
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// GET BY CLIENT NAME
const getSalesByClientName = async (inDelivery: boolean, clientName: string) => {
    try {
        const sales: SaleMongoType[] = await SaleModel.find({ client_name: { $regex: clientName, $options: 'i' } }).lean() // FIND ALL SALE WITH CLIENT NAME        
        if(inDelivery){
            const salesFiltered = filterSaleForDelivery(sales) // IF INDELIVERY IS TRUE, THEN FILTERED THE SALES            
            return salesFiltered
        }
        return sales
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// GET BY CLIENT ID
const getSaleByClientId = async (clientId: IdType) => {
    checkId(clientId)
    try {
        const sale = await SaleModel.find({client_id: clientId}).lean() // FIND THE SALE BY HIS ID
        if(!sale) { // CHECK IF EXISTS THE SALE OR RUN AN EXCEPTION
            throw new ResourceNotFoundError('Venta')
        }
        return sale
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
        const salesFound: SaleMongoType[] = await SaleModel.find({createdAt: newFormatDate}).lean() // FIND ALL SALES WITH THIS DATE
        if(inDelivery){
            const salesFiltered = filterSaleForDelivery(salesFound) // IF INDELIVERY IS TRUE, THEN FILTERED THE SALES, AND RETURN IT
            return salesFiltered
        }
        return salesFound
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// DELTE BY ID
const removeSaleById = async (saleId: IdType) => {
    checkId(saleId)
    const session = await startSession() // INIT A SESSION FOR TRANSACTIONS
    try{
        session.startTransaction() // INIT THE TRANSACTION
        const sale = await SaleModel.findById(saleId).session(session) //  FIND SALE BY HIS ID
        if(!sale){
            throw new ResourceNotFoundError('Venta') // IF SALE NOT EXISTS, THEN RUN AN EXCEPTION
        }
        if(sale.client_id !== undefined){ // IF CLIENT ID EXISTS, THE SUBTRACT THE SALE FROM CLIENT AND UPDATE BALANCE
            await removeSaleToClient(sale.client_id, saleId, session)
        }
        await SaleModel.findByIdAndDelete(saleId) // DELETE SALE
    } catch(e) {
        await session.abortTransaction() //ABORT THE TRANSACTION
        ErrorsPitcher(e)
    }finally{
        await session.endSession() // END THE TRANSACTION
    }
}

export { createSale, modifySale, getAllSales, getSaleById, getSaleForDetailsById, getSalesByClientName, getSalesByDate, getSaleByClientId, removeSaleById }