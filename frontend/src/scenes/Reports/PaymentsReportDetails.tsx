import { CustomTextItem } from "@/components/CustomTextItem"
import { DetailsCard } from "@/components/ui-components/DetailsCard"
import { DetailsLayout } from "@/components/DetailsLayout"
import { FlexBetween } from "@/components/FlexBetween"
import { SpinnerLoading } from "@/components/ui-components/SpinnerLoading"
import useScreenSize from "@/hooks/useScreenSize"
import { useGetPaymentsReportByIdQuery } from "@/redux/api/paymentsReportApi"
import { getFormatedDate } from "@/utils/functionsHelper/getFormatedDate"
import { IPaymentsReport } from "@/utils/interfaces/IPaymentsReport"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AssessmentIcon from '@mui/icons-material/Assessment';
import CalculateIcon from '@mui/icons-material/Calculate'
import {  Button } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid"
import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue"
import { CustomDatGrid } from "@/components/CustomDataGrid"


type PaymentsReportDetailsProps = object

const PaymentsReportDetails: React.FC<PaymentsReportDetailsProps> = () => {

    const {id} = useParams()
    const parsedId = id as string
    const { isMobile } = useScreenSize()
    const { isLoading, data } = useGetPaymentsReportByIdQuery(parsedId)
    const report = data?.data as IPaymentsReport

    const columnsBase: GridColDef[] = [
        { field: "client_name", headerName: 'Cliente', flex: 0.5 },
        { field: 'amount', headerName: 'Monto', flex: 0.5, renderCell: (value) => getFormatedValue(value.row.amount) }
    ]

    const columnsTablet: GridColDef[] = [
        { field: 'payment_method', headerName: 'Metodo', flex: 0.5 },
    ]

    const columnsDesktop: GridColDef[] = [
        
    ]

    useEffect(() => {
        console.log(report);
    },[report])

    if(isLoading || !report) return <SpinnerLoading />

    return (
        <DetailsLayout title="Reporte de pagos">
            <FlexBetween gap={1} flexDirection={isMobile ? 'column': 'row'} width={'100%'} alignItems={isMobile ? 'stretch' : 'flex-start'} mb={'1rem'}>
                <DetailsCard size={isMobile ? "XXL" : "M"} flexGrow={1} isMobile={isMobile}>
                    <CustomTextItem isTitle>Información</CustomTextItem>
                    <CustomTextItem isTitle={false} tag="Fecha" icon={<CalendarMonthIcon fontSize={isMobile ? "small" : "medium"}/>}>
                        {getFormatedDate(report?.createdAt)}
                    </CustomTextItem>
                    <CustomTextItem isTitle={false} tag="Estado" icon={<AssessmentIcon fontSize={isMobile ? "small" : "medium"}/>}>
                        {report?.report_status}
                    </CustomTextItem>
                    <CustomTextItem isTitle={false} tag="Cant. pagos" icon={<CalculateIcon fontSize={isMobile ? "small" : "medium"}/>}>
                    {report?.payments_dto.length}
                    </CustomTextItem>

                </DetailsCard>
                <DetailsCard size={isMobile ? "XXL" : "M"} flexGrow={1} isMobile={isMobile} centerContent>
                        <Button disabled={report?.report_status !=='pendiente'} variant="contained">Validar reporte</Button>                    
                </DetailsCard>
            </FlexBetween>
            <FlexBetween>
                <DetailsCard size="XXL" flexGrow={1} isMobile={isMobile}>
                    <CustomDatGrid
                        rows={report?.payments_dto || []}
                        isFilterName={false}
                        columnsBase={columnsBase}
                        addedColumnsTable={columnsTablet}
                        addedColumnsDesktop={columnsDesktop}
                        isLoading={isLoading}
                        lightMode={true}
                        idName="client_id"
                    />
                </DetailsCard>
            </FlexBetween>
        </DetailsLayout>
    )
}

export {PaymentsReportDetails}