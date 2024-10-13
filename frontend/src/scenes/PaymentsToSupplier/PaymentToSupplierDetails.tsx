import { DetailsLayout } from "@/components/DetailsLayout"
import useScreenSize from "@/hooks/useScreenSize"
import { useGetPaymentToSupplierDetailsByIdQuery } from "@/redux/api/paymentToSupplierApi"
import { IPaymentToSupplierDetails } from "@/utils/interfaces/IPaymentToSupplier"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

type PaymentToSupplierDetailsProps = object

const PaymentToSupplierDetails: React.FC<PaymentToSupplierDetailsProps> = () => {
    const {id} = useParams()
    const parsedId = id as string
    const {isMobile} = useScreenSize()
    const {data, isLoading} = useGetPaymentToSupplierDetailsByIdQuery(parsedId)
    const paymentToSupplier = data?.data as IPaymentToSupplierDetails
    const navigate = useNavigate()

    useEffect(() => {
        console.log(paymentToSupplier);
        
    }, [paymentToSupplier])

    return (
        <DetailsLayout title="Pago a proveedor">
            Pago
        </DetailsLayout>
    )
}

export {PaymentToSupplierDetails}