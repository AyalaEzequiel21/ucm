export interface INewClientValues {
    fullname: string,
    phone: string,
    category: 'cat_1' | 'cat_2',
    in_delivery: boolean,
    is_active?: boolean
}