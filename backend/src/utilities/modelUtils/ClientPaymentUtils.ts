import { ClientSession, get } from "mongoose";
import { getClientById } from "../../services/ClientService";
import { BadRequestError, InternalServerError, ResourceNotFoundError } from "../../errors/CustomErros";
import { ClientPaymentModel } from "../../models";
import { PaymentDtoType } from "../../schemas/PaymentDtoSchema";
import { IdType } from "../types/IdType";
import { IPaymentsOfClientDetails } from "../interfaces/IClientDetails";
import { ClientPaymentMongoType, ClientPaymentType } from "../../schemas/ClientPaymentSchema";


/////////////////////////
// CLIENT PAYMENT UTILS
/////////////////////////




// ADD PAYMENT TO CLIENT AND UPDATE THE CLIENT BALANCE
const addPaymentToClient = async (clientId: IdType, payment: ClientPaymentMongoType, session: ClientSession) => {
    try {
        const client = await getClientById(clientId) // FIND CLIENT WITH SESSION AND CLIENT SERVICE, CHECK IF EXISTS OR RUN AN EXCEPTION        
        if(client && payment && payment._id) {
            client.balance -= payment.amount // UPDATE THE CLIENT BALANCe
            client.payments?.push(payment._id) // ADD PAYMENT TO CLIENT LIST OF PAYMENTS
            await client.save({session})
        }
    } catch(e){   
        throw e
    }
}

// REMOVE PAYMENT TO CLIENT AND UPDATE THE BALANCE
const subtractPaymentToClient = async (paymentId: IdType, clientId: IdType, amount: number, session: ClientSession) => {
    try {
        const client = await getClientById(clientId) // FIND CLIENT WITH  CLIENT SERVICE, CHECK IF EXISTS UPDATE IT
        if(client && client.payments && client.balance) {
            client.payments = client.payments.filter(payment => payment != paymentId) // SUBTRACT PAYMENT TO CLIENT LIST OF PAYMENTS
            client.balance += amount // UPDATE THE CLIENT BALANCE
            await client.save({session})

        }
    } catch(e){
        throw e
    }
}

const processOnePayment = async (payment: PaymentDtoType, reportId: IdType|undefined, session: ClientSession ) => {
    if(!payment.client_id){ // CHECK IF EXISTS CLIENT ID OR RUN AN EXCEPTION IF NOT EXISTS
        throw new BadRequestError('Algunos datos faltan o son invalidos')
    }
    try {
        const client = await getClientById(payment.client_id)  // VERIFY IF CLIENT EXISTS OR RUN AN EXCEPTION
        if(client){
            const paymentCreated: unknown[] = await ClientPaymentModel.create([{
                client_name: payment.client_name,
                client_id: payment.client_id,
                amount: payment.amount,
                payment_method: payment.payment_method,
                report_id: reportId,
            }], {session}) // CREATE THE PAYMENT IN DATA BASE
            if(!paymentCreated || paymentCreated.length !== 1){
                throw new InternalServerError(`No se pudo crear el pago ${payment.client_name}`) 
            }
            const paymentParsed = paymentCreated[0] as ClientPaymentMongoType
            const { amount, _id, client_id} = paymentParsed // GET THE NECESSARY ATRIBUTES  FOR ADD THE PAYMENT TO THE CLIENT
            if(!amount || !_id || !client_id){
                throw new BadRequestError('Faltan algunos datos necesarios')
            }
            await addPaymentToClient(client_id,  paymentParsed, session)  //  ADD THE PAYMENT TO CLIENT
            return _id // RETURN THE FIRST ELEMENT OF ARRAY, IS THE PAYMENT CREATED

        }
    } catch(e) {
        throw e
    }
}


const processPaymentOfSale = async (payment: ClientPaymentType, session: ClientSession) => {
    try {
        let paymentCreated: unknown[] = [];
         paymentCreated = await ClientPaymentModel.create([payment], {session}) // CREATE THE PAYMENT IN DATA BASE
        const paymentParsed = paymentCreated[0] as ClientPaymentMongoType
        const { amount, client_id} = paymentParsed // GET THE NECESSARY ATRIBUTES  FOR ADD THE PAYMENT TO THE CLIENT
        if (!paymentParsed || !paymentParsed.amount || !paymentParsed._id || !paymentParsed.client_id) {
            throw new InternalServerError(`El pago creado no contiene los atributos necesarios`);
        }
        if(amount && client_id){
            await addPaymentToClient(client_id,  paymentParsed, session)  //  ADD THE PAYMENT TO CLIENT
            return paymentParsed // RETURN THE FIRST ELEMENT OF ARRAY, IS THE PAYMENT CREATED
        }
    } catch(e) {        
        throw e
    }
}

const updateSaleIdOfPayment = async (paymentId: IdType, saleId: IdType) => {
    try {
        await ClientPaymentModel.findByIdAndUpdate(paymentId, {sale_id: saleId})
    } catch(e) {
        throw e
    }
}

const getClientPaymentsForDetails = async (clientId: IdType) => {
    try {
        const paymentsFound = await ClientPaymentModel.find({client_id: clientId}) // FIND CLIENT PAYMENT BY ID
                .select('_id amount payment_method createdAt')
                .lean<IPaymentsOfClientDetails[]>()
        if(!paymentsFound) {
            throw new ResourceNotFoundError("Pagos del cliente")
        }
        return paymentsFound
    } catch(e) {
        throw e
    }
}

export { addPaymentToClient, subtractPaymentToClient, processOnePayment, updateSaleIdOfPayment, processPaymentOfSale, getClientPaymentsForDetails }


