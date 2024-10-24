import { DetailsLayout } from "@/components/DetailsLayout"
import { FlexBetween } from "@/components/FlexBetween"
import { SpinnerLoading } from "@/components/SpinnerLoading"
import useScreenSize from "@/hooks/useScreenSize"
import { useGetPaymentsReportByIdQuery } from "@/redux/api/paymentsReportApi"
import { IPaymentsReport } from "@/utils/interfaces/IPaymentsReport"
import { useParams } from "react-router-dom"

type PaymentsReportDetailsProps = object

const PaymentsReportDetails: React.FC<PaymentsReportDetailsProps> = () => {

    const {id} = useParams()
    const parsedId = id as string
    const { isMobile } = useScreenSize()
    const { isLoading, data } = useGetPaymentsReportByIdQuery(parsedId)
    const report = data?.data as IPaymentsReport

    if(isLoading || !report) return <SpinnerLoading />

    return (
        <DetailsLayout title="Reporte de pagos">
            <FlexBetween gap={1} flexDirection={isMobile ? 'column': 'row'} width={'100%'} alignItems={isMobile ? 'stretch' : 'flex-start'} mb={'1rem'}>
                Hola
            </FlexBetween>
        </DetailsLayout>
    )
}

export {PaymentsReportDetails}