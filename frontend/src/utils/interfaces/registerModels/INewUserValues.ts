export interface INewUserValues {
    username: string,
    password: string,
    role: 'admin'|'biller'|'delivery'
}

export interface IUpdateUserValues  extends Omit<INewUserValues, 'password'>{
    password?: string
    _id: string
}