import z from 'zod'

const UserRole = z.enum(["admin", "biller", "delivery"])

const rolesArray = UserRole.options.map(option => option) // ARRAY WITH EVERYONE ROLES

export {UserRole, rolesArray}