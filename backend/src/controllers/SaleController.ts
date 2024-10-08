import { NextFunction, Request, Response } from "express";
import { SaleMongoType, SaleType } from "../schemas/SaleSchema";
import { createSale, getAllSales, getSalesByClientName, getSaleById, modifySale, getSalesByDate, removeSaleById, getSaleByClientId, getSaleForDetailsById } from "../services/SaleService";
import { RequestExtended } from "../utilities/interfaces/RequestExtended";

/////////////////////////
// SALE CONTROLLER
///////////////////////

// REGISTER SALE
const registerSale = async (req: Request, res: Response, next: NextFunction) => {
    const sale: SaleType = req.body //  GET THE DATA FOR REGISTER THE SALE
    try{
        const saleCreated = await createSale(sale) // CREATE THE SALE WITH THE SERVICE
        res.status(201).json({ok: true, data: saleCreated})
    } catch(e) {
        next(e)
    }
}

// UPDATE SALE
const updateSale = async (req: Request, res: Response, next: NextFunction) => {
    const sale: SaleMongoType = req.body // GET THE SALE UPDATED FROM THE REQUEST
    try {
        const saleUpdated = await modifySale(sale) // UPDATE THE SALE WITH THE SERVICE
        res.status(200).json({ok: true, data: saleUpdated})
    } catch(e) {
        next(e)
    }
}

// FIND ALL SALES
const findAllSales = async (req: RequestExtended, res: Response, next: NextFunction) => {
    const inDelivery = !!req.filterDelivery // GET INDELIVERY FROM PARAMS
    try {
        const sales = await getAllSales(inDelivery) //  FIND ALL SALES WITH THE SERVICE
        res.status(200).json({ok: true, data: sales})
    } catch(e){
        next(e)
    }
}

// FIND SALE BY ID
const findSaleById = async (req: Request, res: Response, next: NextFunction) => {
    const saleId = req.params.saleId // GET THE SALE ID FROM PARAMS
    try {
        const sale = await getSaleById(saleId) // FIND THE SALE WITH THE SERVICE
        res.status(200).json({ok: true, data: sale})
    } catch(e){
        next(e)
    }
}

// FIND SALE BY CLIENT NAME
const findSalesByClientName = async (req: RequestExtended, res: Response, next: NextFunction) => {
    const inDelivery = !!req.filterDelivery // GET IN DELIVERY FROM PARAMS
    const clientName = req.params.clientName //  GET THE CLIENT NAME FROM PARAMS
    try {
        const sales = await getSalesByClientName(inDelivery, clientName) //  FIND THE SALES WITH THE SERVICE
        res.status(200).json({ok: true, data: sales})
    } catch(e){
        next(e)
    }
}

//  FIND SALES BY CLIENT ID
const findSalesByClientId = async (req: Request, res: Response, next: NextFunction) => {
    const clientId = req.params.clientId // GET THE SALE ID FROM PARAMS
    try {
        const sale = await getSaleByClientId(clientId) // FIND THE SALE WITH THE SERVICE
        res.status(200).json({ok: true, data: sale})
    } catch(e){
        next(e)
    }
}

// FIND SALES FOR DETAILS BY ID
const findSalesForDetailsById = async (req: Request, res: Response, next: NextFunction) => {
    const saleId = req.params.saleId // GET THE SALE ID FROM PARAMS
    try {
        const sale = await getSaleForDetailsById(saleId) // FIND THE SALE WITH THE SERVICE
        res.status(200).json({ok: true, data: sale})
    } catch(e){
        next(e)
    }
}

// FIND SALE BY DATE
const findSalesByDate = async (req: RequestExtended, res: Response, next: NextFunction) => {
    const inDelivery = !!req.filterDelivery // GET INDELIVERY FROM PARAMS
    const {date} = req.query // GET THE DATE FROM QUERY REQUEST
    try {
        const sales = await getSalesByDate(inDelivery, date as string) // FIND SALES WITH THIS DATE WITH THE SERVICE
        res.status(200).json({ok: true, data: sales})
    } catch(e) {
        next(e)
    }
}

// DELETE SALE BY ID
const deleteSaleById = async (req: Request, res: Response, next: NextFunction) => {
    const saleid = req.params.saleId //  GET THE SALE ID FROM PARAMS
    try {
        await removeSaleById(saleid) // DELETE THE SALE WITH THE SERVICE
        res.status(204).json({ok: true})
    }catch(e) {
        next(e)
    }
}

export { registerSale, updateSale, findAllSales, findSaleById, findSalesForDetailsById, findSalesByClientName, findSalesByClientId, findSalesByDate, deleteSaleById }