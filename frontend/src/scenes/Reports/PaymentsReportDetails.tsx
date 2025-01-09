import { CustomTextItem } from "@/components/CustomTextItem"
import { DetailsCard } from "@/components/ui-components/DetailsCard"
import { FlexBetween } from "@/components/FlexBetween"
import { SpinnerLoading } from "@/components/ui-components/SpinnerLoading"
import useScreenSize from "@/hooks/useScreenSize"
import { useDeletePaymentsReportMutation, useGetPaymentsReportByIdQuery, useValidatePaymentsReportMutation } from "@/redux/api/paymentsReportApi"
import { getFormatedDate } from "@/utils/functionsHelper/getFormatedDate"
import { IPaymentsReport } from "@/utils/interfaces/IPaymentsReport"
import { useNavigate, useParams } from "react-router-dom"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AssessmentIcon from '@mui/icons-material/Assessment';
import CalculateIcon from '@mui/icons-material/Calculate'
import {  Box, Button } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid"
import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue"
import { CustomDatGrid } from "@/components/CustomDataGrid"
import { SceneContainer } from "@/components/SceneContainer"
import { Header } from "@/components/Header"
import { HeaderButton } from "@/components/ui-components/buttons/HeaderButton"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { PaymentsReportModifyForm } from "@/components/forms/modify/PaymentsReportModifyForm"
import { useEffect, useState } from "react"
import { useModalAlert } from "@/hooks/useModalAlert"
import { DeleteConfirmComponent } from "@/components/ui-components/DeleteConfirmComponent"


type PaymentsReportDetailsProps = object

const PaymentsReportDetails: React.FC<PaymentsReportDetailsProps> = () => {

    const {id} = useParams()
    const parsedId = id as string
    const { isMobile } = useScreenSize()
    const [isDeleteTriggered, setDeleteTriggered] = useState(false)
    const { isLoading, data } = useGetPaymentsReportByIdQuery(parsedId, {skip: isDeleteTriggered})
    const report = data?.data as IPaymentsReport
    const { toggleErrorAlert, toggleSuccessAlert } = useModalAlert()
    const userLogin = useSelector((state: RootState) => state.user.userLogin)
    const [deletePaymentsReport, {isLoading: isDeleting}] = useDeletePaymentsReportMutation()
    const [validatePaymentsReport, {isLoading: isValidating}] = useValidatePaymentsReportMutation()
    const isDelivery = userLogin?.role === 'delivery'
    const navigate = useNavigate()

    const handleDelete = () => setDeleteTriggered(true)

    useEffect(() => {
        if(isDeleteTriggered) {
            const deletePaymentsReportAsync = async () => {
                try {
                    if (parsedId) {
                        await deletePaymentsReport(parsedId).unwrap()
                        toggleSuccessAlert('Reporte de pagos eliminado exitosamente')
                    }
                    navigate('/paymentsReport', { replace: true })
                } catch (error) {
                    toggleErrorAlert('Error al eliminar el reporte de pagos')
                    console.error('Error al eliminar el reporte de pagos:', error)
                }
            }
            deletePaymentsReportAsync()
        }
    }, [isDeleteTriggered, deletePaymentsReport, parsedId, navigate, toggleErrorAlert, toggleSuccessAlert])

    const columnsBase: GridColDef[] = [
        { field: "client_name", headerName: 'Cliente', flex: 0.5 },
        { field: 'amount', headerName: 'Monto', flex: 0.5, renderCell: (value) => getFormatedValue(value.row.amount) }
    ]

    const columnsTablet: GridColDef[] = [
        { field: 'payment_method', headerName: 'Metodo', flex: 0.5 },
    ]

    const columnsDesktop: GridColDef[] = [
        
    ]

    if(isLoading || !report) return <SpinnerLoading />

    return (
        <SceneContainer>
            <Header title="Reporte de pagos" subtitle="Detalles">
                <HeaderButton
                    form={<PaymentsReportModifyForm paymentsReportData={report}/>}
                    type="edit"
                    disabled={isDelivery || report?.report_status !== 'pendiente'}
                />
                <HeaderButton
                    form={<DeleteConfirmComponent model="Reporte de pago" onConfirm={handleDelete} isLoading={isDeleting}/>}
                    type="delete"
                    disabled={isDelivery || report?.report_status !== 'pendiente'}
                />
            </Header>
            <Box marginTop={'1rem'} width={'100%'}>
                <FlexBetween gap={1} flexDirection={isMobile ? 'column': 'row'} width={'100%'} alignItems={isMobile ? 'stretch' : 'flex-start'} mb={'1rem'}>
                    <DetailsCard size={isMobile ? "XXL" : "M"} flexGrow={1} isMobile={isMobile}>
                        <CustomTextItem isTitle>Información</CustomTextItem>
                        <CustomTextItem isTitle={false} tag="Fecha" icon={<CalendarMonthIcon fontSize={isMobile ? "small" : "medium"}/>}>
                            {getFormatedDate(report?.createdAt || "")}
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
            </Box>
        </SceneContainer>
    )
}

export {PaymentsReportDetails}