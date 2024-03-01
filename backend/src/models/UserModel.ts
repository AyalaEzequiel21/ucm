import { Schema, model } from "mongoose";
import { UserType } from "../schemas/AuthSchema";
import { rolesArray } from "../utilities/types/UserRole";

const userSchema = new Schema<UserType>(
    {
        username: {
            required: true,
            type: String,
            unique: true,
            min: 5
        },
        password: {
            required: true,
            type: String,
            min: 8
        },
        role: {
            required: true,
            enum: rolesArray
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const UserModel = model("User", userSchema, "users")

export default UserModel