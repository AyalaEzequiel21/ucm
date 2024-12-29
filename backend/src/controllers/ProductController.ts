import { NextFunction, Request, Response } from "express";
import { ProductMongoType, ProductType } from "../schemas/ProductsSchema";
import { createProduct, getAllProducts, getProductById, getProductsByName, modifyProduct, removeProductById } from "../services/ProductService";
import { RequestExtended } from "../utilities/interfaces/RequestExtended";

/////////////////////////
// PRODUCT CONTROLLER
///////////////////////

// NEW PRODUCT
const registerProduct = async (req: Request, res: Response, next: NextFunction) => {
    const product: ProductType = req.body // GET THE PRODUCT DATA TO CREATE FROM REQUEST
    try{
        const newProduct = await createProduct(product) // REGISTER THE NEW PRODUCT WITH PRODUCT SERVICE
        res.status(201).json({ok: true, data: newProduct})
    } catch(e) {
        next(e)
    }
}

// UPDATE PRODUCT
const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const product: ProductMongoType = req.body // GET THE NEW DATA PRODUCT TO UPDATE
    try{
        const productUpdated = await modifyProduct(product) // UPDATE THE PRODUCT WITH PRODUCT SERVICE
        res.status(200).json({ok: true, data: productUpdated})
    } catch(e) {
        next(e)
    }
}
// FIND ALL PRODUCTS
const findAllProducts = async (req: RequestExtended, res: Response, next: NextFunction) => {
    const inDelivery = !!req.filterDelivery // CHECK IF THE REQUEST HAS THE FILTER DELIVERY
    try{
        const productsFound = await getAllProducts(inDelivery) // FIND ALL PRODUCTS WITH PRODUCT SERVICE
        res.status(200).json({ok: true, data: productsFound})
    } catch(e) {
        next(e)
    }
}

// FIND PRODUCT BY NAME
const findProductByName = async (req: Request, res: Response, next: NextFunction) => {
    const productName = req.params.productName //  GET THE PRODUCT NAME FROM PARAMS REQUEST
    try{
        const productsFound = await getProductsByName(productName) // FIND PRODUCTS THAT CONTAINS THE PRODUCT NAME
        res.status(200).json({ok: true, data: productsFound})
    } catch(e) {
        next(e)
    }
}
// FIND PRODUCT BY ID
const findProductById = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId //  GET THE PRODUCT ID FROM REQUEST PARAMS
    try{
        const product = await getProductById(productId) //  FIND PRODUCT BY ID WITH PRODUCT SERVICE
        res.status(200).json({ok: true, data: product})
    } catch(e) {
        next(e)
    }
}
// DELETE PRODUCT BY ID
const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId //  GET THE PRODUCT ID FROM REQUEST PARAMS
    try{
        await removeProductById(productId) // DELETE PRODUCT WITH PRODUCT SERVICE
        res.status(204).json({ok: true})
    } catch(e) {
        next(e)
    }
}

export { registerProduct, updateProduct, findAllProducts,findProductById, findProductByName, deleteProduct }