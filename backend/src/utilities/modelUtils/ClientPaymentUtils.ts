import { ObjectId, ClientSession } from "mongoose";
import { getClientById } from "../../services/ClientService";
import { ResourceNotFoundError } from "../../errors/CustomErros";
import {ClientPaymentModel} from "../../models";

/////////////////////////
// CLIENT PAYMENT UTILS
/////////////////////////


// GET A CLIENT WITH ID
const getAClientWithId = async (clientId: ObjectId| string, session: ClientSession|undefined) => {
    try {
        const clientFound = await getClientById(clientId, session) //  FIND CLIENT WITH CLIENT SERVICE
        return clientFound
    } catch(e) {
        throw e
    }
}

// ADD PAYMENT TO CLIENT AND UPDATE THE CLIENT BALANCE
const addPaymentToClient = async (clientId: string|ObjectId, paymentId: string|ObjectId, amount: number, session: ClientSession) => {
    try {
        const client = await getClientById(clientId, session) // FIND CLIENT WITH SESSION AND CLIENT SERVICE, CHECK IF EXISTS OR RUN AN EXCEPTION
        if(!client) {
            throw new ResourceNotFoundError('Cliente')
        }
       const payment = await ClientPaymentModel.findById(paymentId).session(session)// FIND CLIENT PAYMENT WITH SESSION, CHECK IF EXISTS OR RUN AN EXCEPTION
       if(!payment) {
        throw new ResourceNotFoundError('Pago del cliente')
       }
       if(client.client_payments && client.balance) {
            const paymentForClient = {
                ...payment.toObject(),
                _id: payment._id.toString()
            }
            client.client_payments?.push(paymentForClient) // ADD PAYMENT TO CLIENT LIST OF PAYMENTS
            client.balance -= amount // UPDATE THE CLIENT BALANCE
            await client.save()
       }
    } catch(e){
        throw e
    }
}

// REMOVE PAYMENT TO CLIENT AND UPDATE THE BALANCE
const subtractPaymentToClient = async (paymentId: string|ObjectId, clientId: string|ObjectId, amount: number, session: ClientSession) => {
    try {
        const client = await getClientById(clientId, session) // FIND CLIENT WITH SESSION AND CLIENT SERVICE, CHECK IF EXISTS OR RUN AN EXCEPTION
        if(!client) {
            throw new ResourceNotFoundError('Cliente')
        }
       const payment = await ClientPaymentModel.findById(paymentId).session(session)// FIND CLIENT PAYMENT WITH SESSION, CHECK IF EXISTS OR RUN AN EXCEPTION
       if(!payment) {
        throw new ResourceNotFoundError('Pago del cliente')
       }
       if(client.client_payments && client.balance) {

        client.client_payments = client.client_payments.filter(payment => payment._id != paymentId) // SUBTRACT PAYMENT TO CLIENT LIST OF PAYMENTS
        client.balance += amount // UPDATE THE CLIENT BALANCE
        await client.save()
   }
    } catch(e){
        throw e
    }
}

export { getAClientWithId, addPaymentToClient, subtractPaymentToClient }