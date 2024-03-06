import { sign, verify } from "jsonwebtoken"
import { UserCookieType } from "../schemas/AuthSchema"

const JWT_SECRET = process.env.SECRET_KEY || "ultraSecretKey"

const generateToken = (userCookie: UserCookieType) => {
    const jwt = sign(userCookie, JWT_SECRET, {
        expiresIn: "4h"
    })
    return jwt
}

const verifyToken = (jwt: string) => {
    const isOk = verify(jwt, JWT_SECRET)
    return isOk
}

export { generateToken, verifyToken }