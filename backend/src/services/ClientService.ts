import { ErrorsPitcher } from "../errors/ErrorsPitcher";
import ClientModel from "../models/ClientModel";
import { ClientMongoType, ClientType } from "../schemas/ClientSchema";
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

// UPDATE 

const modifyClient = async (clientUpdated: ClientMongoType) => {
    const { _id, sales, payments, ...clientFiltered } = clientUpdated
    try { 
        const client = await ClientModel.findByIdAndUpdate( // FIND BY ID AND UPDATE THE CLIENT. THEN RETURN THE NEW VERSION
            _id, 
            clientFiltered, 
            {new: true, runValidators: true}
        )
        if(!client) { // CHECK THAT CLIENT EXISTS, BUT RUN AN EXCEPTION
            throw new ResourceNotFoundError('Usuario')
        }
        return client
    }catch(e) {
        ErrorsPitcher(e)
    }
}

// FIND ALL ACTIVES 

const getAllActivesUsers = async () => {
    try{
        const users = await ClientModel.find({is_active: true})
        return users
    } catch(e) {
        ErrorsPitcher(e)
    }
}