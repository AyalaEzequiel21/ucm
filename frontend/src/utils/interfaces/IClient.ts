import { CategoryType } from "../types/CategoryType"

export interface IClient {
    _id: string,
    fullname: string,
    phone: string,
    category: CategoryType,
    in_delivery: boolean,
    balance: number,
    sales: string[],
    payments: string[]
    is_active: boolean,
    createdAt: string
}
