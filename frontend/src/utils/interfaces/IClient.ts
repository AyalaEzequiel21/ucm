
export interface IClient {
    _id: string,
    fullname: string,
    phone: string,
    category: 'cat_1'|'cat_2',
    in_delivery: boolean,
    balance: number,
    sales: string[],
    payments: string[]
    is_active: boolean,
    createdAt: string
}
