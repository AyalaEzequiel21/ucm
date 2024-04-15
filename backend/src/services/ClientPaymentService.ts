import { startSession } from "../config/startSession";
import { BadRequestError, ResourceNotFoundError } from "../errors/CustomErros";
import { ErrorsPitcher } from "../errors/ErrorsPitcher";
import {ClientPaymentModel} from "../models";
import { ClientPaymentType } from "../schemas/ClientPaymentSchema";
import { getAClientWithId, addPaymentToClient, subtractPaymentToClient } from "../utilities/modelUtils/ClientPaymentUtils";
import { PaymentMethodType, paymentMethodsArray } from "../utilities/types/PaymentMethod";
import { convertDateString, validateDate } from "../utilities/datesUtils";
import { checkId } from "../utilities/validateObjectId";
import { IdType } from "../utilities/types/IdType";

/////////////////////////
// CLIENT PAYMENT SERVICE
///////////////////////

// CREATE
const createClientPayment = async (clientPayment: ClientPaymentType) => {
    const { client_id, amount, client_name, payment_method } = clientPayment //  GET THE PARAMETERS PAYMENT FROM THE REQUEST 
    const session = await startSession() // INIT A SESSION FOR TRANSACTION
    if(!client_id || !amount || !payment_method || !client_name) { // CHECK THAT ALL THE NECESSARY PARAMETERS ARE EXIST, OR RUN AN EXCEPTION
        throw new BadRequestError("Faltan datos necesarios")
    }
    try {
        session.startTransaction() // INIT TRANSACTIONS
        const client = await getAClientWithId(client_id, session) // FIND CLIENTS PAYMENT
        if(!client) { // IF CLIENT NOT EXISTS RUN AN EXCEPTION
            throw new ResourceNotFoundError('Cliente')
        }
        const paymentCreated = await ClientPaymentModel.create([clientPayment], {session: session}) // CREATE THE PAYMENT IN THE SESSION
        const paymentId = paymentCreated[0]._id // GET THE ID OK PAYMENT CREATED
        await addPaymentToClient(client_id, paymentId.toString(), amount, session) //  ADD PAYMENT TO CLIENT AND UPDATE THE BALANCE
        await session.commitTransaction() // CONFIRM ALL CHANGES AND THE TRANSACTION
        return paymentCreated[0]
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
        if(!client_id || !amount || !_id) { // CHECK THAT ALL THE NECESSARY PARAMETERS ARE EXIST, OR RUN AN EXCEPTION
            throw new BadRequestError("Faltan datos necesarios")
        }
        await subtractPaymentToClient(_id.toString(), client_id, amount, session) // SUBTRACT PAYMENT TO CLIENT AND UPDATE THE BALACE
        await ClientPaymentModel.findByIdAndDelete(clientPaymentId, { session: session }) // DELETE THE PAYMENT
        await session.commitTransaction() // COMFIRM THE TRANSACTIONS
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
        const paymentsFound = await ClientPaymentModel.findById(paymentId) // FIND CLIENT PAYMENT BY ID
        if(!paymentsFound) {
            throw new ResourceNotFoundError("Pago de cliente")
        }
        return paymentsFound
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// FIND ALL
const getAllClientsPayments = async () => {
    try {
        const paymentsFound = await ClientPaymentModel.find() // FIND ALL CLIENTS PAYMENTS
        return paymentsFound
    } catch(e) {
        ErrorsPitcher(e)
    }
}

//FIND BY CLIENT ID
const getPaymentsByClientId = async (clientId: IdType) => {
    checkId(clientId)
    try {
        const client = await getAClientWithId(clientId, undefined) // CHECK IF EXISTS AN USER WITH SAME ID
        if(!client) {
            throw new ResourceNotFoundError('Cliente')  // IF NOT EXISTS THE CLIENT, RUN AN EXCEPTION
        }
        const paymentsOfClient = await ClientPaymentModel.find({client_id: clientId}) // FIND ALL PAYMENTS FROM A CLIENT BY THE CLIENTID
        return paymentsOfClient
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
        const paymentsByMethod = await ClientPaymentModel.find({payment_method: paymentMethod}) // FIND ALL PAYMENTS FROM A CLIENT BY THE METHOD
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
        const paymentsFound = await ClientPaymentModel.find({createdAt: newFormatDate}).exec() // FIND THE PAYMENTS BY DATE
        return paymentsFound
    } catch(e) {
        ErrorsPitcher(e)
    }
}

export { createClientPayment, removeClientPayment, getClientPaymentsById, getAllClientsPayments, getPaymentsByClientId, getPaymentsPaymentMethod, getClientsPaymentsByDate }