import { ObjectId } from "mongoose";
import { ResourceAlreadyExistsError, ResourceNotFoundError } from "../errors/CustomErros";
import { ErrorsPitcher } from "../errors/ErrorsPitcher";
import {ProductModel} from "../models";
import { ProductMongoType, ProductType } from "../schemas/ProductsSchema";
import { validateIfExists } from "../utilities/validateIfExists";
import { checkId } from "../utilities/validateObjectId";

/////////////////////////
// PRODUCT SERVICE
///////////////////////

//CREATE

const createProduct = async (newProduct: ProductType) => {
    const { product_name } = newProduct
    try {
        if(await validateIfExists(ProductModel, 'product_name', product_name)){ // CHECK IF EXISTS OTHER PRODUCT WITH THE SAME NAME, IF EXISTS THEN RUN AN EXCEPTION
            throw new ResourceAlreadyExistsError("El producto")
        }

        const product = await ProductModel.create(newProduct) // CREATE THE NEW PRODUCT
        return product
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// UPDATE 
const modifyProduct = async (productUpdated: ProductMongoType) => {
    const { _id, ...productFiltered } = productUpdated // EXCLUDE _ID
    try {
        const product = await ProductModel.findByIdAndUpdate( // FIND PRODUCT BY ID AND UPDATE IT
            _id,
            productFiltered,
            {new: true, runValidators: true}
        )
        if(!product) {
            throw new ResourceNotFoundError('Producto')
        }
        return product
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// FIND ALL ACTIVES
const getAllProducts = async (inDelivery: boolean) => {

    const productsFiltered = async (delivery: boolean) => { // FUNCTION TO FILTER PRICE PRODUCTS WHRN INDELIVERY IS ACTIVE
        const query = ProductModel.find({is_active: true})
        if(delivery) return query.select("-first_price")
        return query
    }

    try {
        const products = await productsFiltered(inDelivery) // FIND ALL FILTERED PRODUCTS
        return products
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// FIND ALL INACTIVES
const getAllInactivesProducts = async () => {
    try {
        const inactiveProducts = await ProductModel.find({is_active: false}) // FIND INACTIVE PRODUCTS
        return inactiveProducts
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// FIND BY NAME
const getProductsByName = async (productName: string) => {
    try {
        const productsFound = await ProductModel.find({product_name: { $regex: productName, $options: 'i' }, is_active: true}) // FIND ALL PRODUCTS THAT CONTAINS THE PRODUCTNAME
        return productsFound
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// FIND BY ID
const getProductById = async (productId: ObjectId|string) => {
    checkId(productId)
    try{
        const productFound = await ProductModel.findById(productId) // FIND PRODUCT BY ID
        if(!productFound) { // IF PRODUCT IS NOT FOUND, RUN AN EXCEPTION
            throw new ResourceNotFoundError('Producto')
        }
        return productFound
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// DELETE BY ID

const removeProductById = async (productId: ObjectId|string) => {
    try{
        const productDeleted = await ProductModel.findById(productId) // FIND PRODUCT BY ID 
        if(!productDeleted || !productDeleted.is_active) { // IF PRODUCT NOT EXISTS OR HIS PROPERTIE IS_ACTIVE IS FALSE, RUN AN EXCEPTION
            throw new ResourceNotFoundError('Producto')
        }
        productDeleted.is_active = false // SET THE PROPERTIE IS_ACTIVE TO FALSE
        await productDeleted.save()
    } catch(e) {
        ErrorsPitcher(e)
    }
}

export { createProduct, modifyProduct, getAllProducts, getAllInactivesProducts, getProductById, getProductsByName, removeProductById }