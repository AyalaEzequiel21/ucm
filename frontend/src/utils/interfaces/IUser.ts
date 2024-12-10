export interface IUser {
    _id: string,
    username: string,
    role: 'admin'|'biller'|'delivery',
    createdAt?: string
}

export interface IUserMongo extends IUser {
    password?: string
}