import { ErrorsPitcher } from "../errors/ErrorsPitcher";
import {ClientModel} from "../models";
import { ClientMongoType, ClientType } from "../schemas/ClientSchema";
import { ClientCategoryType, categoriesArray } from "../utilities/types/ClientCategory";
import { validateIfExists } from "../utilities/validateIfExists";
import { BadRequestError, ResourceAlreadyExistsError, ResourceNotFoundError } from "../errors/CustomErros";
import { checkId } from "../utilities/validateObjectId";
import { IdType } from "../utilities/types/IdType";
import { getSalesAndPaymentOfClientById } from "../utilities/modelUtils/ClientUtils";
import { IClientDetails } from "../utilities/interfaces/IClientDetails";
import { getMostRecentDate } from "../utilities/datesUtils";

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
        const existingClient = await ClientModel.findOne({
            fullname: clientFiltered.fullname,
            _id: { $ne: _id },
        })
        if (existingClient) { 
            throw new ResourceAlreadyExistsError('El nombre ya está siendo utilizado por otro cliente');
        }
        const client = await ClientModel.findByIdAndUpdate( // FIND BY ID AND UPDATE THE CLIENT. THEN RETURN THE NEW VERSION
            _id, 
            clientFiltered, 
            { new: true, runValidators: true }
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
    const getQuery = (confirm: boolean) => {
        if(confirm) {
            return {
                is_active: true,
                in_delivery: true
            }
        } else {
            return {
                is_active: true
            }
        }
    }
    try{
        const activeUsers = await ClientModel.find(getQuery(inDelivery)).lean() // FIND ALL ACTIVE USERS        
        return activeUsers
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// FIND ALL INACTIVES 

const getAllInactivesClients = async () => {
    try{
        const inactiveUsers = await ClientModel.find({is_active: false}).lean() // FIND ALL INACTIVE USERS
        return inactiveUsers
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// FIND BY NAME

const getClientsByName = async (clientName: string) => {
    try {
        const clientsFound = await ClientModel.find({ fullname: { $regex: clientName, $options: 'i' }, is_active: true}).lean() // FIND ALL CLIENTS WITH FULLANME CONTAINS CLIENTNAME
        if(clientsFound.length == 0) {
            throw new ResourceNotFoundError('Usuario')
        }
        return clientsFound
    } catch (e) {
        ErrorsPitcher(e)
    }
}

// FIND BY CATEGORY

const getClientsByCategory = async (category: ClientCategoryType) => {
    if(!categoriesArray.includes(category)){
        throw new BadRequestError('Categoria invalida')
    }
    try {
        const clientsFound = await ClientModel.find({category: category, is_active: true}).lean() // FIND CLIENTS BY CATEGORY
        return clientsFound
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// FIND BY ID
const getClientById = async (clientId: IdType) => {
    checkId(clientId)
    try{
        const client = await ClientModel.findById(clientId) // FIND CLIENT BY ID
        if(!client) { // IF CLIENT NOT EXISTS, RUN AN EXCEPTION
            throw new ResourceNotFoundError('Cliente')
        }
        return client
    } catch(e) {        
        ErrorsPitcher(e)
    }
}

// FIND ALL DETAILS OF CLIENT
const getDetailsOfClient = async (clientId: IdType) => {
    checkId(clientId) // CHECK IF ID IS VALID
    try {
        const client = await ClientModel.findById(clientId) // FIND CLIENT BY ID, ONLY SOMES PROEPIRTIES ARE RETURNED
        .select('_id fullname phone balance category in_delivery createdAt is_active')
        .lean()
        if(!client || !client.createdAt) { // IF CLIENT NOT EXISTS, RUN AN EXCEPTION
            throw new ResourceNotFoundError('Cliente')
        }        
        const {clientPayments, clientSales } = await getSalesAndPaymentOfClientById(clientId) // GET SALES AND PAYMENT OF CLIENT
        const clientDetails: IClientDetails = { // CREATE A CLIENT DETAILS OBJECT WITH ALL PROPERTIES
            ...client,
            createdAt: client.createdAt,
            sales: clientSales,
            payments: clientPayments,
            lastSale: getMostRecentDate(clientSales),
            totalAmountOfSales: clientSales.reduce((acc, sale) => acc + sale.total_sale, 0),
            totalAmountOfPayments: clientPayments.reduce((acc, payment) => acc + payment.amount, 0),
            lastPayment: getMostRecentDate(clientPayments),
        }
        return clientDetails // RETURN CLIENT DETAILS
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// DELETE BY ID

const removeClientById = async (clientId: IdType) => {
    checkId(clientId)
    try{
        const clientDeleted = await ClientModel.findById(clientId) // FIND CLIENT BY ID 
        if(!clientDeleted || !clientDeleted.is_active) { // IF CLIENT NOT EXISTS OR HIS PROPERTIE IS_ACTIVE IS FALSE, RUN AN EXCEPTION
            throw new ResourceNotFoundError('Usuario')
        }
        clientDeleted.is_active = false // SET THE PROPERTIE IS_ACTIVE TO FALSE
        clientDeleted.save()

    } catch(e) {
        ErrorsPitcher(e)
    }
}

export { createClient, modifyClient, getClientById, getAllActivesClients, getAllInactivesClients, getClientsByCategory, getClientsByName, getDetailsOfClient, removeClientById }