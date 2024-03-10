import { Model } from "mongoose";

const validateIfExists = async <T>(
    model: Model<T>, 
    prop: string, 
    value: string
) => {
    const query: Record<string, string> = {} 
    query[prop] = value
    const entity = await model.exists(query)
    return !!entity
}

export { validateIfExists }