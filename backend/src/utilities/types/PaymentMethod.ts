import { z } from "zod";

const PaymentMethod = z.enum(["efectivo", "banco", "mercadopago", "cheque"])

const paymentMethodsArray = PaymentMethod.options.map(option => option)  // ARRAY WITH EVERYONE METHOD

export {PaymentMethod, paymentMethodsArray}