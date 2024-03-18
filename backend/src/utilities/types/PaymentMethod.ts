import { z } from "zod";

const PaymentMethod = z.enum(["efectivo", "banco", "mercadopago", "cheque"])
type PaymentMethodType = z.infer<typeof PaymentMethod>

const paymentMethodsArray = PaymentMethod.options.map(option => option)  // ARRAY WITH EVERYONE METHOD

export {PaymentMethod, PaymentMethodType, paymentMethodsArray}