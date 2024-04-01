import { startSession } from "../config/startSession";
import { BadRequestError, ResourceNotFoundError } from "../errors/CustomErros";
import { ErrorsPitcher } from "../errors/ErrorsPitcher";
import { SaleModel } from "../models";
import { SaleMongoType, SaleType } from "../schemas/SaleSchema";
import { processOnePayment } from "../utilities/modelUtils/ClientPaymentUtils";
import { addSaleToClient } from "../utilities/modelUtils/SaleUtils";
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
            await addSaleToClient(client_id, _id.toString(), total_sale, session) // IF TOTAL SALE IS NOT UNDEFINED, THEN ADD THE SALE TO CLIENT AND UPDATE THE BALANCE
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

export { createSale }