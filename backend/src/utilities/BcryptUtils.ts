import bcrypt from 'bcryptjs'

const getHashPassword = async (password: string) => {
    const hashPassword = await bcrypt.hash(password, 8)
    return hashPassword
}

const validatePassword = async (password: string, hash: string) => {
    const isOK = await bcrypt.compare(password, hash)
    return isOK
}

export { getHashPassword, validatePassword }