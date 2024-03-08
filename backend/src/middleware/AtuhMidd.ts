import { NextFunction, Request, Response } from "express";
import { UserCookieType } from "../schemas/AuthSchema";
import { verifyToken } from "../utilities/JwtUtils";

interface RequestWithUser extends Request {
    user: UserCookieType
}
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