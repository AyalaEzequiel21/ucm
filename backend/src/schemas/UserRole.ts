import z from 'zod'

export const UserRole = z.enum(["admin", "biller", "delivery"])