export type UserType = {
    _id: string,
    username: string,
    role: 'admin'|'biller'|'delivery'
    createdAt: Date
}