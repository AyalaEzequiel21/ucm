import { ResourceAlreadyExistsError } from "../errors/CustomErros";
import { ErrorsPitcher } from "../errors/ErrorsPitcher";
import { SupplierModel } from "../models";
import { SupplierType } from "../schemas/SupplierSchema";
import { validateIfExists } from "../utilities/validateIfExists";

/////////////////////////
// SUPPLIER SERVICE
///////////////////////


// CREATE
const createSupplier = async (newSupplier: SupplierType) => {
    const { supplier_name, phone, primeProduct } = newSupplier 
    try{
        if(await validateIfExists(SupplierModel, "supplier_name", supplier_name)){ // CHECK IF EXISTS OTHER SUPPLIER WITH THE SAME FULLNAME, IS EXISTS RUN AN EXCEPTION
            throw new ResourceAlreadyExistsError("El nombre")
        }
        if(await validateIfExists(SupplierModel, "phone", phone)){ // CHECK IF EXISTS OTHER SUPPLIER WITH THE SAME PHONE, IS EXISTS RUN AN EXCEPTION
            throw new ResourceAlreadyExistsError('El telefono')
        }
        const supplier = await SupplierModel.create({ // CRETE THE SUPPLIER
            supplier_name: supplier_name,
            phone: phone,
            primeProduct: primeProduct
        })
        return supplier
    } catch(e){
        ErrorsPitcher(e)
    }
}

// FIND ALL 
const getAllSuppliers = async () => {
    try{
        const suppliers = await SupplierModel.find() // FIND ALL SUPPLIERS
        return suppliers
    } catch(e){
        ErrorsPitcher(e)
    }
}

export { createSupplier, getAllSuppliers }