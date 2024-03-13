import { ObjectId } from "mongoose";
import { ErrorsPitcher } from "../errors/ErrorsPitcher";
import ClientModel from "../models/ClientModel";
import { ClientMongoType, ClientType } from "../schemas/ClientSchema";
import { ClientCategoryType } from "../utilities/types/ClientCategory";
import { validateIfExists } from "../utilities/validateIfExists";
import { ResourceAlreadyExistsError, ResourceNotFoundError } from "../errors/CustomErros";

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

const getAllActivesClients = async (inDelivery: boolean) => {
    try{
        const activeUsers = await ClientModel.find({is_active: true, in_delivery: inDelivery}) // FIND ALL ACTIVE USERS
        return activeUsers
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// FIND ALL INACTIVES 

const getAllInactivesClients = async () => {
    try{
        const inactiveUsers = await ClientModel.find({is_active: false}) // FIND ALL INACTIVE USERS
        return inactiveUsers
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// FIND BY NAME

const getClientsByName = async (clientName: string) => {
    try {
        const clientsFound = await ClientModel.find({ fullname: { $regex: clientName, $options: 'i' }, is_active: true}) // FIND ALL CLIENTS WITH FULLANME CONTAINS CLIENTNAME
        return clientsFound
    } catch (e) {
        ErrorsPitcher(e)
    }
}

// FIND BY CATEGORY

const getClientsByCategory = async (category: ClientCategoryType) => {
    try {
        const clientsFound = await ClientModel.find({category: category, is_active: true}) // FIND CLIENTS BY CATEGORY
        return clientsFound
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// FIND BY ID

const getClientById = async (ClientId: ObjectId|string) => {
    try {
        const userFound = await ClientModel.findById(ClientId) // FIND USER BY ID
        if(!userFound) { // IF USER NOT EXISTS, RUN AN EXCEPTION
            throw new ResourceNotFoundError('Usuario')
        }
        return userFound
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// DELETE BY ID

const removeClientById = async (clientId: ObjectId|string) => {
    try{
        const clientDeleted = await ClientModel.findByIdAndDelete(clientId) // DELETE CLIENT BY ID 
        if(!clientDeleted) {
            throw new ResourceNotFoundError('Usuario')
        }
    } catch(e) {
        ErrorsPitcher(e)
    }
}

export { createClient, modifyClient, getClientById, getAllActivesClients, getAllInactivesClients, getClientsByCategory, getClientsByName, removeClientById}