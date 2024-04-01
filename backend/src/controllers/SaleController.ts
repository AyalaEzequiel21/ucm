import { NextFunction, Request, Response } from "express";
import { SaleType } from "../schemas/SaleSchema";
import { createSale } from "../services/SaleService";


const registerSale = async (req: Request, res: Response, next: NextFunction) => {
    const sale: SaleType = req.body //  GET THE DATA FOR RESGISTER THE SALE
    try{
        const saleCreated = await createSale(sale)
        res.status(201).json({ok: true, data: saleCreated})
    } catch(e) {
        next(e)
    }
}

export { registerSale }