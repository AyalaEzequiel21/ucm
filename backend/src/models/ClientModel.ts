import { Schema, model } from "mongoose";
import { ClientMongo } from "../schemas/ClientSchema";
import { categoriesArray } from "../utilities/types/ClientCategory";

const clientSchema = new Schema<ClientMongo>(
    {
        fullname: {
            required: true,
            type: String,
            min: 5,
            max: 15
        },
        phone: {
            required: true,
            type: String,
            unique: true,
            min: 8,
            max: 15
        },
        category: {
            required: true,
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
        is_active: {
            type: Boolean,
            default: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const ClientModel = model("Client", clientSchema, "clients")

export default ClientModel