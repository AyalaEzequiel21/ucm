import { z } from "zod";

const SalesListStatus = z.enum(["pendiente", "completo"])

const listStatusArray = SalesListStatus.options.map(option => option)

export { SalesListStatus, listStatusArray }