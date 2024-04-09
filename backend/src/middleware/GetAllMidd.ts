import { NextFunction, Response } from "express"
import { RequestExtended } from "../utilities/interfaces/RequestExtended"

const filterGetAll = () => {
    return (req: RequestExtended, res: Response, next: NextFunction) => {
        const userRole = req.user?.role // GET THE USER ROLE FRON REQUEST
        if (userRole && userRole === "delivery") {
            req.filterDelivery = true
        } else {
            req.filterDelivery = false
        }
        next()
    }
}

export { filterGetAll }