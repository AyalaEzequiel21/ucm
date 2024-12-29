import { ResourceAlreadyExistsError, ResourceNotFoundError } from "../errors/CustomErros";
import { ErrorsPitcher } from "../errors/ErrorsPitcher";
import {ProductModel} from "../models";
import { ProductMongoType, ProductType } from "../schemas/ProductsSchema";
import { validateIfExists } from "../utilities/validateIfExists";
import { checkId } from "../utilities/validateObjectId";
import { IdType } from "../utilities/types/IdType";

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
        const existingProduct = await ProductModel.findOne({
            product_name: productFiltered.product_name,
            _id: { $ne: _id },
        })
        if (existingProduct) { 
            throw new ResourceAlreadyExistsError('El nombre ya está siendo utilizado por otro producto');
        }
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
        const query = ProductModel.find().lean()
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

// FIND BY NAME
const getProductsByName = async (productName: string) => {
    try {
        const productsFound = await ProductModel.find({product_name: { $regex: productName, $options: 'i' }, is_active: true}).lean() // FIND ALL PRODUCTS THAT CONTAINS THE PRODUCTNAME
        return productsFound
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// FIND BY ID
const getProductById = async (productId: IdType) => {
    checkId(productId)
    try{
        const productFound = await ProductModel.findById(productId).lean() // FIND PRODUCT BY ID
        if(!productFound) { // IF PRODUCT IS NOT FOUND, RUN AN EXCEPTION
            throw new ResourceNotFoundError('Producto')
        }
        return productFound
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// DELETE BY ID
const removeProductById = async (productId: IdType) => {
    try{
        const productDeleted = await ProductModel.findById(productId) // FIND PRODUCT BY ID 
        if(!productDeleted) { // IF PRODUCT NOT EXISTS RUN AN EXCEPTION
            throw new ResourceNotFoundError('Producto')
        }
        console.log(productDeleted)
        await productDeleted.deleteOne() // DELETE PRODUCT
    } catch(e) {
        ErrorsPitcher(e)
    }
}

export { createProduct, modifyProduct, getAllProducts, getProductById, getProductsByName, removeProductById }