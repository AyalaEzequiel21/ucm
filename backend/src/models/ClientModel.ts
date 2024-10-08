import mongoose, { Schema } from "mongoose";
import { ClientMongoType } from "../schemas/ClientSchema";
import { categoriesArray } from "../utilities/types/ClientCategory";

export const clientSchema = new Schema<ClientMongoType>(
    {
        fullname: {
            required: true,
            type: String,
            unique: true,
            minLenth: 4,
            maxLenth: 15
        },
        phone: {
            required: true,
            type: String,
            unique: true,
            minLenth: 8,
            maxLenth: 15
        },
        category: {
            required: true,
            type: String,
            enum: categoriesArray
        },
        balance: {
            type: Number,
            default: 0.0
        },
        in_delivery: {
            type: Boolean,
            required: true
        },
        sales: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Sale", 
            default: []
        }],
        payments: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: "ClientPayment", 
            default: []
        }], 
        is_active: {
            type: Boolean,
            default: true
        }, 
        createdAt: {
            type: Date,
            required: false
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)