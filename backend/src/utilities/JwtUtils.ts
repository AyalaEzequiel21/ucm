import { sign, verify } from "jsonwebtoken"
import { UserCookieType } from "../schemas/AuthSchema"

const JWT_SECRET = process.env.SECRET_KEY || "ultraSecretKey"

const generateToken = (userCookie: UserCookieType) => {
    const jwt = sign(userCookie, JWT_SECRET, {
        expiresIn: "2h"
    })
    return jwt
}

const verifyToken = (jwt: string) => {
    try {
        const decoded = verify(jwt, JWT_SECRET)
        
        return decoded
    } catch (error) {
        console.error(error)
        return null
    }
}

export { generateToken, verifyToken }