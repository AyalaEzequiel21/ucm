import { ResourceAlreadyExistsError, ResourceNotFoundError } from "../errors/CustomErros";
import { ErrorsPitcher } from "../errors/ErrorsPitcher";
import ProductModel from "../models/ProductModel";
import { ProductMongoType, ProductType } from "../schemas/ProductsSchema";
import { validateIfExists } from "../utilities/validateIfExists";

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