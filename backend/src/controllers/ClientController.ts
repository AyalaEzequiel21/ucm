import { NextFunction, Request, Response } from "express";
import { ClientMongoType, ClientType } from "../schemas/ClientSchema";
import { createClient, getAllActivesClients, getAllInactivesClients, getClientById, getClientsByCategory, getClientsByName, modifyClient, removeClientById } from "../services/ClientService";
import { ClientCategoryType } from "../utilities/types/ClientCategory";
import { RequestExtended } from "../utilities/interfaces/RequestExtended";

/////////////////////////
// CLIENT CONTROLLER
///////////////////////

// NEW CLIENT 
const registerClient = async (req: Request, res: Response, next: NextFunction) => {
    const client: ClientType = req.body // GET THE CLIENT DATA TO CREATE FROM REQUEST
    try {
        const newClient = await createClient(client) // REGISTER THE NEW CLIENT WITH CLIENT SERVICE
        res.status(201).json({ok: true, data: newClient})
    } catch (e) {
        next(e)
    }
}

// UPDATE CLIENT
const updateClient = async (req: Request, res: Response, next: NextFunction) => {
    const client: ClientMongoType = req.body // GET THE NEW DATA CLIENT TO UPDATE
    try {
        const clientUpdated = await modifyClient(client) // UPDATE THE CLIENT WITH CLIENT SERVICE
        res.status(200).json({ok: true, data: clientUpdated})
    } catch(e) {
        next(e)
    }
}

// FIND ACTIVES CLIENTS
const findActivesClients = async (req: RequestExtended, res: Response, next: NextFunction) => {
    const inDelivery = !!req.filterDelivery
    try {
        const activeClients = await getAllActivesClients(inDelivery) // FIND ALL ACTIVE CLIENTS
        res.status(200).json({ok: true, data: activeClients})
    } catch(e) {
        next(e)
    }
}

// FIND INACTIVES CLIENTS
const findInactivesClients = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const inactiveClients = await getAllInactivesClients() // FIND ALL INACTIVE CLIENTS
        res.status(200).json({ok: true, data: inactiveClients})
    } catch(e) {
        next(e)
    }
}

// FIND CLIENTS BY NAME
const findClientsByName = async (req: Request, res: Response, next: NextFunction) => {
    const clientName = req.params.clientName // GET THE CLIENT NAME FROM PARAMS REQUEST
    try {
        const clientsByName = await getClientsByName(clientName) // FIND CLIENTS BY NAME WITH CLIENTS SERVICE
        res.status(200).json({ok: true, data: clientsByName})
    } catch(e) {
        next(e)
    }
}

// FIND CLIENTS BY CATEGORY
const findClientsByCategory = async (req: Request, res: Response, next: NextFunction) => {
    const clientCategory = req.params.clientCategory // GET THE CLIENT CATEGORY FROM PARAMS REQUEST
    try {
        const clientsByCategory = await getClientsByCategory(clientCategory as ClientCategoryType) // FIND CLIENTS BY NAME WITH CLIENTS SERVICE
        res.status(200).json({ok: true, data: clientsByCategory})
    } catch(e) {
        next(e)
    }
}

// FIND CLIENT BY ID
const findClientById = async (req: Request, res: Response, next: NextFunction) => {
    const clientId = req.params.clientId // GET THE CLIENT ID FROM PARAMS REQUEST
    try {
        const client = await getClientById(clientId) // FIND CLIENT BY ID WITH CLIENT SERVICE
        res.status(200).json({ok: true, data: client})
    } catch(e) {
        next(e)
    }
}

// DELETE CLIENT BY ID

const deleteClientById = async (req: Request, res: Response, next: NextFunction) => {
    const clientId = req.params.clientId // GET THE CLIENT ID FROM PARAMS REQUEST
    try {
        await removeClientById(clientId) // DELETE CLIENT BY ID WITH CLIENT SERVICE
        res.status(204).json({ok: true})
    } catch(e) {
        next(e)
    }
}

export { registerClient, updateClient, deleteClientById, findActivesClients, findInactivesClients, findClientById, findClientsByCategory, findClientsByName }