import { startSession } from "../config/startSession";
import { BadRequestError, ResourceNotFoundError } from "../errors/CustomErros";
import { ErrorsPitcher } from "../errors/ErrorsPitcher";
import ClientPaymentModel from "../models/ClientPaymentModel";
import { ClientPaymentType } from "../schemas/ClientPaymentSchema";
import { addPaymentToClient, getAClientWithId } from "../utilities/modelUtils/ClientPaymentUtils";

/////////////////////////
// CLIENT PAYMENT SERVICE
///////////////////////

//CREATE
const createClientPayment = async (clientPayment: ClientPaymentType) => {
    const { client_id, amount, client_name, payment_method } = clientPayment //  GET THE PARAMETERS PAYMENT FROM THE REQUEST 
    const session = await startSession()
    if(!client_id || !amount || !payment_method || !client_name) { // CHECK THAT ALL THE NECESSARY PARAMETERS ARE EXIST, OR RUN AN EXCEPTION
        throw new BadRequestError("Faltan datos necesarios")
    }
    try {
        const client = await getAClientWithId(client_id, session) // FIND CLIENTS PAYMENT
        if(!client) { // IF CLIENT NOT EXISTS RUN AN EXCEPTION
            throw new ResourceNotFoundError('Cliente')
        }
        const paymentCreated = await ClientPaymentModel.create([clientPayment], {session: session}) // CREATE THE PAYMENT IN THE SESSION
        const paymentId = paymentCreated[0]._id // GET THE ID OK PAYMENT CREATED
        await addPaymentToClient(client_id, paymentId.toString(), amount, session) //  ADD PAYMENT TO CLIENT AND UPDATE THE BALANCE
        await session.commitTransaction() // CONFIRM ALL CHANGES AND THE TRANSACTION
        return paymentCreated
    } catch(e) {
        await session.abortTransaction()
        ErrorsPitcher(e)
    }
    await session.endSession()
}