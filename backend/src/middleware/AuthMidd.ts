import { NextFunction, Response } from "express";
import { UserCookieType } from "../schemas/AuthSchema";
import { verifyToken } from "../utilities/JwtUtils";
import { UserRoleType } from "../utilities/types/UserRole";
import { RequestExtended } from "../utilities/interfaces/RequestExtended";
import { NotAuthorizedError } from "../errors/CustomErros";



// CHECK IF THE USER HAVE A VALID TOKEN
const validateUser = () => {
    return (req: RequestExtended, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ')[1]   
        if (!token) {
            throw new NotAuthorizedError();
        }
        const userValidated =  verifyToken(token)
        
        if(!userValidated) {            
            throw new NotAuthorizedError()
            
        }
        req.user = userValidated as UserCookieType
        console.log(`User: id:${req.user._id}, role: ${req.user.role}.  Validated`);
        next()
    }
}

// CHECK IF THE USER HAVE THE ALLOWED ROLE 
const validateUserRole = (allowedRoles: UserRoleType[] = []) => {
    return (req: RequestExtended, res: Response, next: NextFunction) => {
        const user = req.user
        if(user && allowedRoles.length > 0 && !allowedRoles.includes(user.role)){
            throw new NotAuthorizedError()
        }
        next()
    }
}

export { validateUser, validateUserRole }