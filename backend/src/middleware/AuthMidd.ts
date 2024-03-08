import { NextFunction, Request, Response } from "express";
import { UserCookieType } from "../schemas/AuthSchema";
import { verifyToken } from "../utilities/JwtUtils";
import { UserRoleType } from "../utilities/types/UserRole";

interface RequestWithUser extends Request {
    user: UserCookieType
}

// CHECK IF THE USER HAVE A VALID TOKEN
const validateUser = () => {
    return (req: RequestWithUser, res: Response, next: NextFunction) => {
        const token = req.cookies.jwt
        const userValidated =  verifyToken(token)
        if(!userValidated) {
            throw new NotAuthorizedError()
        }
        req.user = userValidated as UserCookieType
        console.log(`User: ${req.user._id} validated`);
        next()
    }
}

// CHECK IF THE USER HAVE THE ALLOWED ROLE 
const validateUserRole = (allowedRoles: UserRoleType[] = []) => {
    return (req: RequestWithUser, res: Response, next: NextFunction) => {
        const user = req.user
        if(allowedRoles.length > 0 && !allowedRoles.includes(user.role)){
            throw new NotAuthorizedError()
        }
        next()
    }
}

export { validateUser, validateUserRole }