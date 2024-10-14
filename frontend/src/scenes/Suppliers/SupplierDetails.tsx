import { DetailsLayout } from "@/components/DetailsLayout"
import useScreenSize from "@/hooks/useScreenSize"
import { useGetSupplierDetailsByIdQuery } from "@/redux/api/supplierApi"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

type SupplierDetailsProps = object

const SupplierDetails: React.FC<SupplierDetailsProps> = () => {
    
    const {id} = useParams()
    const parsedId = id as string
    const {isMobile} = useScreenSize()
    const {isLoading, data} = useGetSupplierDetailsByIdQuery(parsedId)
    const navigate = useNavigate()

    const handleClickPurchase = (id: string) => {
        navigate(`/purchases/purchase/${id}`)
    }

    const handleClickPayment = (id: string) => {
        navigate(`/paymentsToSuppliers/payment/${id}`)
    }

    useEffect(() => {
        console.log(data);
        
    }, [data])

    return (
        <DetailsLayout title="Proveedor">
            ...
        </DetailsLayout>
    )
}

export {SupplierDetails}