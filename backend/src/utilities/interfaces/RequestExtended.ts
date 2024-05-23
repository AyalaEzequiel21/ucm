import { Request } from "express";
import { UserCookieType } from "../../schemas/AuthSchema";

interface RequestExtended extends Request {
    user?: UserCookieType,
    filterDelivery?: boolean,
    // cookies: {jwt: string}
}

export {RequestExtended}