import { startSession } from "../config/startSession";
import { BadRequestError, ResourceNotFoundError } from "../errors/CustomErros";
import { ErrorsPitcher } from "../errors/ErrorsPitcher";
import {ClientPaymentModel} from "../models";
import { ClientPaymentMongoType, ClientPaymentType } from "../schemas/ClientPaymentSchema";
import { addPaymentToClient, filterPaymentForDelivery, subtractPaymentToClient } from "../utilities/modelUtils/ClientPaymentUtils";
import { PaymentMethodType, paymentMethodsArray } from "../utilities/types/PaymentMethod";
import { convertDateString, validateDate } from "../utilities/datesUtils";
import { checkId } from "../utilities/validateObjectId";
import { IdType } from "../utilities/types/IdType";
import { IPaymentOfSale } from "../utilities/interfaces/ISaleDetails";
import { getTheClientBalance, validateClient } from "../utilities/modelUtils/ClientUtils";
import { getClientById } from "./ClientService";

/////////////////////////
// CLIENT PAYMENT SERVICE
///////////////////////

// CREATE
const createClientPayment = async (clientPayment: ClientPaymentType) => {
    const { client_id, amount, client_name, payment_method } = clientPayment //  GET THE PARAMETERS PAYMENT FROM THE REQUEST 
    if(!client_id || !amount || !payment_method || !client_name) { // CHECK THAT ALL THE NECESSARY PARAMETERS ARE EXIST, OR RUN AN EXCEPTION
        throw new BadRequestError("Faltan datos necesarios")
    }
    const session = await startSession() // INIT A SESSION FOR TRANSACTION
    try {
        session.startTransaction() // INIT TRANSACTIONS
        const clientExists = await validateClient(client_id) // FIND CLIENTS PAYMENT
        if(clientExists) { // IF CLIENT NOT EXISTS RUN AN EXCEPTION
            const paymentCreated: unknown[] = await ClientPaymentModel.create([clientPayment], {session: session}) // CREATE THE PAYMENT IN THE SESSION
            const paymentParsed = paymentCreated[0] as ClientPaymentMongoType
            await addPaymentToClient(client_id, paymentParsed, session) //  ADD PAYMENT TO CLIENT AND UPDATE THE BALANCE
            await session.commitTransaction() // CONFIRM ALL CHANGES AND THE TRANSACTION
            return paymentParsed
        }
    } catch(e) {
        await session.abortTransaction() //ABORT THE TRANSACTION
        ErrorsPitcher(e)
    } finally {
        await session.endSession() // END THE TRANSACTION
    }
}

// DELETE
const removeClientPayment = async (clientPaymentId: IdType) => {
    checkId(clientPaymentId)
    const session = await startSession() // INIT A SESSION FOR TRANSACTIONS
    try {
        session.startTransaction() // INIT TRANSACTIONS
        const payment = await ClientPaymentModel.findById(clientPaymentId) // FIND THE PAYMENT BY ID 
        if(!payment){ // IF PAYMENT IS NOT FOUND, RUN AN EXCEPTION
            throw new ResourceNotFoundError('Pago')
        }
        const {_id, client_id, amount } = payment // GET THE PROPERTIES NECESSARY
        if(client_id && amount && _id) { // CHECK THAT ALL THE NECESSARY PARAMETERS ARE EXIST, OR RUN AN EXCEPTION
            await subtractPaymentToClient(_id.toString(), client_id, amount, session) // SUBTRACT PAYMENT TO CLIENT AND UPDATE THE BALACE
            await payment.deleteOne({session}) // DELETE THE PAYMENT
            await session.commitTransaction() // COMFIRM THE TRANSACTIONS
        }
    } catch(e) {
        await session.abortTransaction() //ABORT THE TRANSACTION
        ErrorsPitcher(e)
    }finally{
        await session.endSession() // END THE TRANSACTION
    }
}

// FIND BY ID
const getClientPaymentsById = async (paymentId: IdType) => {
    checkId(paymentId)
    try {
        const paymentsFound = await ClientPaymentModel.findById(paymentId).lean() // FIND CLIENT PAYMENT BY ID
        if(!paymentsFound) {
            throw new ResourceNotFoundError("Pago de cliente")
        }
        return paymentsFound
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// FIND FOR DETAIL BY ID
const getClientPaymentsByIdForDetail = async (paymentId: IdType) => {
    checkId(paymentId)
    try {
        const paymentFound = await ClientPaymentModel.findById(paymentId).lean() // FIND CLIENT PAYMENT FOR DETAIL BY ID
        if(!paymentFound || !paymentFound.client_id) {
            throw new ResourceNotFoundError("Pago de cliente")
        }
        const clientBalance = await getTheClientBalance(paymentFound.client_id)
        return {...paymentFound, client_balance: clientBalance}
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// FIND ALL
const getAllClientsPayments = async (inDelivery: boolean) => {
    try {
        const paymentsFound: ClientPaymentMongoType[] = await ClientPaymentModel.find().lean() // FIND ALL CLIENTS PAYMENTS
        if(inDelivery) {
            const deliveryPayments = await filterPaymentForDelivery(paymentsFound)
            return deliveryPayments
        }
        return paymentsFound
    } catch(e) {
        ErrorsPitcher(e)
    }
}

//FIND BY CLIENT ID
const getPaymentsByClientId = async (clientId: IdType) => {
    checkId(clientId)
    try {
        const client = await getClientById(clientId) // CHECK IF EXISTS AN USER WITH SAME ID
        if(client) {
            const paymentsOfClient = await ClientPaymentModel.find({client_id: clientId}).lean() // FIND ALL PAYMENTS FROM A CLIENT BY THE CLIENTID
            return paymentsOfClient
        }
    } catch(e) {
        ErrorsPitcher(e)
    }
}

//FIND BY PAYMENT METHOD
const getPaymentsPaymentMethod = async (paymentMethod: PaymentMethodType) => {
    if(!paymentMethodsArray.includes(paymentMethod)){
        throw new BadRequestError("Metodo de pago incorrecto")
    }
    try {
        const paymentsByMethod = await ClientPaymentModel.find({payment_method: paymentMethod}).lean() // FIND ALL PAYMENTS FROM A CLIENT BY THE METHOD
        return paymentsByMethod
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// FIND BY DATE
const getClientsPaymentsByDate = async (date: string) => {
    if(!validateDate(date)) {  // VALIDATE FORMAT DATE, IF IS INVALID, RUN AN EXCEPTION
        throw new BadRequestError('Datos ingresado no son validos')
    }
    const newFormatDate = convertDateString(date) // CONVERT THE DATE TO VALID FORMAT FOR SEARCH
    try {
        const paymentsFound = await ClientPaymentModel.find({createdAt: newFormatDate}).lean().exec() // FIND THE PAYMENTS BY DATE
        return paymentsFound
    } catch(e) {
        ErrorsPitcher(e)
    }
}

//FIND BY SALE ID
const getClientPaymentBySaleId = async (saleId: IdType) => {
    checkId(saleId)
    try {
        const paymentFound = await ClientPaymentModel.find({sale_id: saleId}) // FIND ALL PAYMENTS BY SALE ID
        .select('_id amount payment_method').lean<IPaymentOfSale[]>() // ONLY SOME PROPERTIES ARE REQUIRED        
        return paymentFound
    } catch(e) {
        ErrorsPitcher(e)
    }
}

export { createClientPayment, removeClientPayment, getClientPaymentsById, getClientPaymentsByIdForDetail, getAllClientsPayments, getPaymentsByClientId, getPaymentsPaymentMethod, getClientsPaymentsByDate, getClientPaymentBySaleId }