import z from 'zod'

const UserRole = z.enum(["admin", "biller", "delivery"])

type UserRoleType = z.infer<typeof UserRole>

const rolesArray = UserRole.options.map(option => option) // ARRAY WITH EVERYONE ROLES

export {UserRole, UserRoleType, rolesArray}