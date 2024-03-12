import { NextFunction, Request, Response } from "express";
import { createUser, getAllUsers, getUserById, loginUser, modifyUser, removeUserById } from "../services/AuthService";
import { UserLoginType, UserMongoType, UserType } from "../schemas/AuthSchema";

/////////////////////////
// USER CONTROLLER
///////////////////////


// NEW USER
const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const user: UserType = req.body // GET THE USER DATA TO CREATE FROM REQUEST
    try {
        const newUser = await createUser(user) // REGISTER USER WITH AUTH SERVICE
        res.status(201).json({ok: true, data: {username: newUser?.username, role: newUser?.role}})
    } catch(e) {
        next(e)
    }
}

// LOGIN

const login = async (req: Request, res: Response, next: NextFunction) => {
    const userData: UserLoginType = req.body //  GET THE DATA FROM LOGIN (USERNAME AND PASSWORD)
    try {
        const token = await loginUser(userData) // GET THE TOKEN WITH AUTH SERVICE
        if(!token) {
            throw new AuthenticationError()
        }
        res.cookie('jwt', token, {
            maxAge: 1000 * 60 * 120,  // SET TIME EXPIRATION COOKIE = 2H
            httpOnly: true // SET ONLY READ 
        })
        .status(200)
        .json({ok: true, message: "Login successful", token: token})
    } catch(e) {
        next(e)
    }
}

// LOGOUT

const logout = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie('jwt') // CLEAR COOKIE WITH NAME JWT
        res.status(200).json({ok: true, message: "Logout successful"})
    } catch(e) {
        next(e)
    }
}

// UPDATE USER 

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const user: UserMongoType = req.body // GET THE NEW DATA USER TO UPDATE
    try {
        const userUpdated = await modifyUser(user) // UPDATE THE USER WITH AUTH SERVICE
        res.status(200).json({ok: true, data: {
            _id: userUpdated?._id, 
            username: userUpdated?.username, 
            role: userUpdated?.role
        }})
    } catch(e) {
        next(e)
    }
}

// FIND ALL USERS

const findAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getAllUsers() // FIND ALL USERS WITH AUTH SERVICES
        res.status(200).json({ok: true, data: users})
    } catch(e) { 
        next(e)
    }
}

// FIND USER BY ID  

const findUserById = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId // GET THE USER ID FROM THE PARAMS REQUEST 
    try {
        const userSaved = await getUserById(userId) // FIND USER BY ID WITH AUTH SERVICE
        res.status(200).json({ok: true, data: userSaved})
    } catch(e) {
        next(e)
    }
}

// DELETE USER BY ID

const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId // GET THE USER ID FROM THE PARAMS REQUEST 
    try {
        const deletedUser = await removeUserById(userId) // DELETE USER BY ID WITH AUTH SERVICE
        res.status(204).json({ok: true})
    } catch(e) {
        next(e)
    }
}

export { deleteUserById, findAllUsers, findUserById, login, logout, registerUser, updateUser }