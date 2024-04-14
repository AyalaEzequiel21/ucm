import mongoose, { Schema } from "mongoose";
import { PurchaseDetailType, PurchaseType } from "../schemas/PurchaseSchema";

const purchaseDetail = new Schema<PurchaseDetailType>(
    {
        product_name: {
            type: String,
            minlength: 5,
            maxlength: 18,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        unity_price: {
            type: Number,
            required: true,
            min: 1
        },
        partial_total: {
            type: Number,
            min: 0.1
        }
    }
)

purchaseDetail.pre('validate', function(next) {
    if (this.quantity && this.unity_price) {
        this.partial_total = this.quantity * this.unity_price;
    }
    next();
});

export const purchaseSchema = new Schema<PurchaseType>(
    {
        supplier_id: {
            type: mongoose.Schema.Types.ObjectId,
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
            min:1
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

purchaseSchema.pre('save', function(next) {
    if (this.purchaseDetail && this.purchaseDetail.length > 0) {
        this.total_purchase = this.purchaseDetail.reduce((total, detail) => {
            return total + (detail.partial_total || 0);
        }, 0);
    }
    next();
});