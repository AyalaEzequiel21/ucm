import { z } from "zod"

const validateAmount = () => {
    return z.number().refine(value => value > 0, {message: "The value must be more that 0"})
}

export { validateAmount }