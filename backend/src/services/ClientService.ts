import { ErrorsPitcher } from "../errors/ErrorsPitcher";
import ClientModel from "../models/ClientModel";
import { ClientType } from "../schemas/ClientSchema";
import { validateIfExists } from "../utilities/validateIfExists";

/////////////////////////
// CLIENT SERVICE
///////////////////////


// CREATE

const createClient = async (newClient: ClientType) => {
    const { fullname, category, phone, in_delivery } = newClient
    try {
        if (await validateIfExists(ClientModel, "fullname", fullname)) { // CHECK IF EXISTS OTHER CLIENT WITH THE SAME FULLNAME, IS EXISTS RUN AN EXCEPTION
            throw new ResourceAlreadyExistsError('El nombre')
        }
        if(await validateIfExists(ClientModel, "phone", phone)){ // CHECK IF EXISTS OTHER CLIENT WITH THE SAME PHONE, IS EXISTS RUN AN EXCEPTION
            throw new ResourceAlreadyExistsError('El telefono')
        }
        const client = await ClientModel.create({ // CREATE THE NEW CLIENT
            fullname: fullname,
            phone: phone,
            category: category,
            in_delivery: in_delivery
        })
        return client
    } catch(e) {
        ErrorsPitcher(e)
    }
}