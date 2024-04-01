import mongoose, { Schema } from "mongoose";
import { DetailSaleListType, SalesListMongoType } from "../schemas/SalesListSchema";
import { listStatusArray } from "../utilities/types/SalesListStatus";

const detailSaleListSchema = new Schema<DetailSaleListType>({
    sale_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Sale"
    },
    client_name: {
        required: true,
        type: String,
        minlength: 4,
        maxlength: 15
    },
    totalSale: {
        required: true,
        type: Number,
        min: 0.1
    }
})

export const salesListSchema = new Schema<SalesListMongoType>(
    {
        salesdetail: [detailSaleListSchema],
        status: {
            type: String,
            enum: listStatusArray,
            default: "pendiente"
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)