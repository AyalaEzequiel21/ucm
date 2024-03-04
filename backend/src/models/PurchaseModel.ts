import { Schema, model } from "mongoose";
import { PurchaseDetailType, PurchaseType } from "../schemas/PurchaseSchema";

const purchaseDetail = new Schema<PurchaseDetailType>(
    {
        product_id: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
        product_name: {
            type: String,
            minlength: 5,
            maxlength: 18
        },
        description: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 70
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        partial_total: {
            type: Number,
            required: true,
            min: 0.1
        }
    }
)

const purchaseSchema = new Schema<PurchaseType>(
    {
        supplier_id: {
            type: Schema.Types.ObjectId,
            ref: "Supplier",
            required: true
        },
        supplier_name: {
            type: String,
            required: true,
            minlength: 4,
            maxlength: 15
        },
        purchaseDetail: [purchaseDetail],
        total_purchase: {
            type: Number, 
            required: true,
            min:1
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const PurchaseModel = model("Purchase", purchaseSchema, "purchases")

export default PurchaseModel