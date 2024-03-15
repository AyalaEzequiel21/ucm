import { ResourceAlreadyExistsError } from "../errors/CustomErros";
import ProductModel from "../models/ProductModel";
import { ProductType } from "../schemas/ProductsSchema";
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

        const product = await ProductModel.create(newProduct)
    } catch(e) {

    }
}