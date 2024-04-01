import { ClientSession } from "mongoose";
import { getClientById } from "../../services/ClientService";
import { BadRequestError, InternalServerError, ResourceNotFoundError } from "../../errors/CustomErros";
import { ClientPaymentModel } from "../../models";
import { PaymentDtoType } from "../../schemas/PaymentDtoSchema";
import { IdType } from "../types/IdType";


/////////////////////////
// CLIENT PAYMENT UTILS
/////////////////////////


// GET A CLIENT WITH ID
const getAClientWithId = async (clientId: IdType, session: ClientSession|undefined) => {
    try {
        const clientFound = await getClientById(clientId, session) //  FIND CLIENT WITH CLIENT SERVICE
        return clientFound
    } catch(e) {
        throw e
    }
}

// ADD PAYMENT TO CLIENT AND UPDATE THE CLIENT BALANCE
const addPaymentToClient = async (clientId: IdType, paymentId: IdType, amount: number, session: ClientSession) => {
    try {
        const client = await getClientById(clientId, session) // FIND CLIENT WITH SESSION AND CLIENT SERVICE, CHECK IF EXISTS OR RUN AN EXCEPTION
        if(!client) {
            throw new ResourceNotFoundError('Cliente')
        }
       const payment = await ClientPaymentModel.findById(paymentId).session(session)// FIND CLIENT PAYMENT WITH SESSION, CHECK IF EXISTS OR RUN AN EXCEPTION
       if(!payment) {
            console.log(payment);
            throw new ResourceNotFoundError('Pago del cliente')
       }
       if(client.payments && client.balance !== undefined) {
            const paymentForClient = {
                ...payment.toObject(),
                _id: payment._id.toString()
            }
            client.payments.push(paymentForClient._id) // ADD PAYMENT TO CLIENT LIST OF PAYMENTS
            client.balance -= amount // UPDATE THE CLIENT BALANCE
            await client.save({session})
       }
    } catch(e){
        throw e
    }
}

// REMOVE PAYMENT TO CLIENT AND UPDATE THE BALANCE
const subtractPaymentToClient = async (paymentId: IdType, clientId: IdType, amount: number, session: ClientSession) => {
    try {
        const client = await getClientById(clientId, session) // FIND CLIENT WITH SESSION AND CLIENT SERVICE, CHECK IF EXISTS OR RUN AN EXCEPTION
        if(!client) {
            throw new ResourceNotFoundError('Cliente')
        }
       const payment = await ClientPaymentModel.findById(paymentId).session(session)// FIND CLIENT PAYMENT WITH SESSION, CHECK IF EXISTS OR RUN AN EXCEPTION
       if(!payment) {
        throw new ResourceNotFoundError('Pago del cliente')
       }
       if(client.payments && client.balance) {

        client.payments = client.payments.filter(payment => payment != paymentId) // SUBTRACT PAYMENT TO CLIENT LIST OF PAYMENTS
        client.balance += amount // UPDATE THE CLIENT BALANCE
        await client.save()
   }
    } catch(e){
        throw e
    }
}

const processOnePayment = async (payment: PaymentDtoType, reportId: IdType|undefined, saleId: IdType|undefined, session: ClientSession ) => {
    if(!payment.client_id){ // CHECK IF EXISTS CLIENT ID OR RUN AN EXCEPTION IF NOT EXISTS
        throw new BadRequestError('Algunos datos faltan o son invalidos')
    }
    try {
        const client = await getClientById(payment.client_id, session)  // VERIFY IF CLIENT EXISTS OR RUN AN EXCEPTION
        if(!client) { 
            throw new ResourceNotFoundError('Cliente')
        }
        const paymentCreated = await ClientPaymentModel.create([{
            client_name: payment.client_name,
            client_id: payment.client_id,
            amount: payment.amount,
            payment_method: payment.payment_method,
            report_id: reportId,
            sale_id: saleId
        }], {session}) // CREATE THE PAYMENT IN DATA BASE
        if(!paymentCreated || paymentCreated.length !== 1){
            throw new InternalServerError(`No se pudo crear el pago ${payment.client_name}`) 
        }
        const { amount, _id, client_id} = paymentCreated[0] // GET THE NECESSARY ATRIBUTES  FOR ADD THE PAYMENT TO THE CLIENT
        if(!amount || !_id || !client_id){
            throw new BadRequestError('Faltan algunos datos necesarios')
        }
        await addPaymentToClient(client_id,  _id.toString(), amount, session)  //  ADD THE PAYMENT TO CLIENT
        return _id.toString() // RETURN THE FIRST ELEMENT OF ARRAY, IS THE PAYMENT CREATED
    } catch(e) {
        throw e
    }
}

export { getAClientWithId, addPaymentToClient, subtractPaymentToClient, processOnePayment }