import { ResourceAlreadyExistsError, ResourceNotFoundError } from "../errors/CustomErros";
import { ErrorsPitcher } from "../errors/ErrorsPitcher";
import { SupplierModel } from "../models";
import { SupplierMongoType, SupplierType } from "../schemas/SupplierSchema";
import { IdType } from "../utilities/types/IdType";
import { validateIfExists } from "../utilities/validateIfExists";
import { checkId } from "../utilities/validateObjectId";
import { getPurchasesAndPaymentsOfSupplier } from "../utilities/modelUtils/SupplierUtils";
import { ISupplierDetails } from "../utilities/interfaces/ISupplierDetails";
import { getMostRecentDate } from "../utilities/datesUtils";

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
        const supplier = await SupplierModel.create({ // CREATE THE SUPPLIER
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
        const suppliers = await SupplierModel.find({is_active: true}).lean() // FIND ALL SUPPLIERS
        return suppliers
    } catch(e){
        ErrorsPitcher(e)
    }
}

// FIND ALL INACTIVES 
const getAllInactiveSuppliers = async () => {
    try{
        const suppliers = await SupplierModel.find({is_active: false}).lean() // FIND ALL SUPPLIERS
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

// FIND ALL DETAILS OF SUPPLIER
const getDetailsOfSupplier = async (supplierId: IdType) => {
    checkId(supplierId)
    try{
        const supplier = await SupplierModel.findById(supplierId)
        .select('-purchases -payments')
        .lean() //  FIND SUPPLIER BY HIS ID
        if(!supplier || !supplier.createdAt) {
            throw new ResourceNotFoundError("El proveedor") //  IF SUPPLIER NOT EXISTS, THEN RUN AN EXCEPTION.
        }
        const {supplierPayments, supplierPurchases} = await getPurchasesAndPaymentsOfSupplier(supplierId)
        const supplierDetails: ISupplierDetails = {
            ...supplier, 
            purchases: supplierPurchases,
            lastPurchase: getMostRecentDate(supplierPurchases),
            totalAmountOfPurchases: supplierPurchases.reduce((acc, curr) => acc + curr.total_purchase, 0),
            payments: supplierPayments, 
            lastPayment: getMostRecentDate(supplierPayments),
            totalAmountOfPayments: supplierPayments.reduce((acc, curr) => acc + curr.total_payment, 0),
            createdAt: supplier.createdAt
        }
        return supplierDetails
    } catch(e) {
        ErrorsPitcher(e)
    } 
}

// UPDATE
const modifySupplier = async (supplierUpdated: SupplierMongoType) => {
    const { payments, _id, purchases, ...supplierFiltered } = supplierUpdated // SUBTRACT THE PROPERTIES THAT NOT BE UPDATE
    try {
        const existingSupplier = await SupplierModel.findOne({
            supplier_name: supplierFiltered.supplier_name,
            _id: { $ne: _id },
        })

        if (existingSupplier) { 
            throw new ResourceAlreadyExistsError('El nombre ya está siendo utilizado por otro proveedor');
        }
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
        const supplier = await SupplierModel.findById(supplierId) //  DELETE THE SUPPLIER WITH HIS ID
        if (!supplier){
            throw new ResourceNotFoundError('Proveedor')
        }
        supplier.is_active = false
        await supplier.save()
    } catch(e) {
        ErrorsPitcher(e)
    }
}

export { createSupplier, getAllSuppliers, getAllInactiveSuppliers, getSuppliersByName, getSupplierById, getDetailsOfSupplier, modifySupplier, removeSupplierById }