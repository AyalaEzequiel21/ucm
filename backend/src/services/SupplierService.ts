import { ClientSession } from "mongoose";
import { ResourceAlreadyExistsError, ResourceNotFoundError } from "../errors/CustomErros";
import { ErrorsPitcher } from "../errors/ErrorsPitcher";
import { SupplierModel } from "../models";
import { SupplierMongoType, SupplierType } from "../schemas/SupplierSchema";
import { IdType } from "../utilities/types/IdType";
import { validateIfExists } from "../utilities/validateIfExists";
import { checkId } from "../utilities/validateObjectId";

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
        const suppliers = await SupplierModel.find().lean() // FIND ALL SUPPLIERS
        return suppliers
    } catch(e){
        ErrorsPitcher(e)
    }
}

// FIND BY NAME
const getSuppliersByName = async (supplierName: string) => {
    try {
        const suppliers = await SupplierModel.find({supplier_name: { $regex: supplierName, $options: 'i' }}).lean() //  FIND ALL SUPPLIER THAT CONTAINS THIS NAME
        return suppliers
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// FIND BY ID
const getSupplierById = async (supplierId: IdType) => {
    checkId(supplierId)
    try{
        const supplier = await SupplierModel.findById(supplierId) //  FIND SUPPLIER BY HIS ID
        if(!supplier) {
            throw new ResourceNotFoundError("Proveedor") //  IF SUPPLIER NOT EXISTS, THEN RUN AN EXCEPTION.
        }
        return supplier
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// UPDATE
const modifySupplier = async (supplierUpdated: SupplierMongoType) => {
    const { payments, _id, purchases, ...supplierFiltered } = supplierUpdated // SUBTRACT THE PROPERTIES THAT NOT BE UPDATE
    try {
        const supplier = await SupplierModel.findByIdAndUpdate( // FINTHE SUPPLIER AND UPDATE IT
            _id, 
            supplierFiltered,
            {new: true, runValidators: true}
        )
        if(!supplier) { // IF SUPPLIER NOT EXISTS, THEN RUN AN EXCEPTION
            throw new ResourceNotFoundError('Proveedor')
        }
        return supplier
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// DELETE BY ID
const removeSupplierById = async (supplierId: IdType) => {
    checkId(supplierId)
    try {
        const supplier = await SupplierModel.findByIdAndDelete(supplierId) //  DELETE THE SUPPLIER WITH HIS ID
        if (!supplier){
            throw new ResourceNotFoundError('Proveedor')
        }
    } catch(e) {
        ErrorsPitcher(e)
    }
}

export { createSupplier, getAllSuppliers, getSuppliersByName, getSupplierById, modifySupplier, removeSupplierById }