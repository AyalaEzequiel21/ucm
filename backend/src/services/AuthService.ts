import { ObjectId } from "mongoose";
import { ErrorsPitcher } from "../errors/ErrorsPitcher";
import UserModel from "../models/UserModel";
import { UserLoginType, UserMongoType, UserType } from "../schemas/AuthSchema";
import { getHashPassword, validatePassword } from "../utilities/BcryptUtils";
import { generateToken } from "../utilities/JwtUtils";
import { validateIfExists } from "../utilities/validateIfExists";
import { AuthenticationError, ResourceAlreadyExistsError, ResourceNotFoundError } from "../errors/CustomErros";

/////////////////////////
// AUTH SERVICE
///////////////////////


// CREATE

const createUser = async (newUser: UserType) => {
    const {username, password, role} = newUser
    try {
        if(await validateIfExists(UserModel, "username", username)){ // CHECK IF EXISTS OTHER USER WITH THE SAME USERNAME, IS EXISTS RUN AN EXCEPTION
            throw new ResourceAlreadyExistsError('El usuario')
        }
        const hashPassword = await getHashPassword(password)  // CREATE THE PASSWORD HASHED
        const user = await UserModel.create({ // CREATE THE NEW USER
            username: username,
            password: hashPassword,
            role: role
        })
        return user
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// LOGIN 

const loginUser = async (userLogin: UserLoginType) => {
    const {username, password} = userLogin
    try {
        const user = await UserModel.findOne({username: username}) // FIND A USER WITH THE SAME USERNAME
        if(!user) { //IF NOT FOUND USER, THEN RUN AN EXCEPTION
            throw new ResourceNotFoundError('Usuario')
        }
        const passwordMatch = await validatePassword(password, user.password) // CHECK IF THE PASSWORDS MATCH OR RUN AN EXCEPTION
        if(!passwordMatch) {
            throw new AuthenticationError()
        }
        const token = generateToken({  // SIGN THE TOKEN WITH JWT, THE FUNCTION NEEDS: _ID, ROLE
            _id:  user._id.toString(),
            username: user.username,
            role: user.role
        })
        return token
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// UPDATE 

const modifyUser = async (userUpdated: UserMongoType) => {
    const {_id, username, password, role} = userUpdated
    try {
        const hashPassword = await getHashPassword(password) // HASH THE PASSWORD
        const user = await UserModel.findByIdAndUpdate( // FIND USER BY ID, AND UPDATE
            _id,
            {
                username,
                hashPassword,
                role
            },
            { new: true, runValidators: true }
            ) // CHECK THAT USER EXISTS, BUT RUN AN EXCEPTION
        if(!user) {
            throw new ResourceNotFoundError('Usuario')
        } 
        return user
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// FIND ALL

const getAllUsers = async () => {
    try {
        const users = await UserModel.find().select('-password') // FIND ALL USERS
        return users
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// FIND BY ID

const getUserById = async (userId: ObjectId|string) => {
    try {
        const userSaved = await UserModel.findById(userId) // FIND USER BY ID
        if(!userSaved) { // IF USER NOT EXISTS RUN AN EXCEPTION
            throw new ResourceNotFoundError('Usuario')
        }
        return userSaved
    } catch(e) {
        ErrorsPitcher(e)
    }
} 

// DELETE BY ID

const removeUserById = async (userId: ObjectId|string) => {
    try {
        const userRemoved = await UserModel.findByIdAndDelete(userId) // DELETE USER BY ID
        if(!userRemoved) {
            throw new ResourceNotFoundError('Usuario')
        }
    } catch(e) {
        ErrorsPitcher(e)
    }
}

export { createUser, modifyUser, loginUser, getAllUsers, getUserById, removeUserById }