import { CustomTextItem } from "@/components/CustomTextItem"
import { DetailsCard } from "@/components/ui-components/DetailsCard"
import { FlexBetween } from "@/components/FlexBetween"
import useScreenSize from "@/hooks/useScreenSize"
import { useDeleteClientPaymentMutation, useGetClientPaymentDetailsByIdQuery } from "@/redux/api/clientPaymentApi"
import { getFormatedDate } from "@/utils/functionsHelper/getFormatedDate"
import { IClientPayment } from "@/utils/interfaces/IClientPayment"
import { useNavigate, useParams } from "react-router-dom"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import PersonIcon from '@mui/icons-material/Person'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue"
import PaymentIcon from '@mui/icons-material/Payment';
import ReceiptIcon from '@mui/icons-material/Receipt'
import ListAltIcon from '@mui/icons-material/ListAlt'
import { SpinnerLoading } from "@/components/ui-components/SpinnerLoading"
import { Box, Typography } from "@mui/material"
import { ToolbarButton } from "@/components/ToolbarButton"
import { SceneContainer } from "@/components/SceneContainer"
import { Header } from "@/components/Header"
import { useEffect, useState } from "react"
import { HeaderButton } from "@/components/ui-components/buttons/HeaderButton"
import { useModalAlert } from "@/hooks/useModalAlert"
import { ActionConfirmComponent } from "@/components/ui-components/ActionConfirmComponent"

type PaymentDetailsProps = object

const PaymentDetails: React.FC<PaymentDetailsProps> = () => {
    
    const {id} = useParams()
    const parsedId = id as string
    const {isMobile} = useScreenSize()
    const [isDeleteTriggered, setDeleteTriggered] = useState(false)
    const { isLoading, data} = useGetClientPaymentDetailsByIdQuery(parsedId, {skip: isDeleteTriggered})
    const payment = data?.data as IClientPayment
    const { toggleErrorAlert, toggleSuccessAlert } = useModalAlert()
    const [deleteClientPayment, {isLoading: isDeleting}] = useDeleteClientPaymentMutation()
    const navigate = useNavigate()

    const handleClickToClient = (client_id: string) => {
        navigate(`/clients/client/${client_id}`)
    }
    
    const handleDelete = () => setDeleteTriggered(true)

    useEffect(() => {
        if(isDeleteTriggered) {
            const deleteClientPaymentAsync = async () => {
                try {
                    if (id) {
                        await deleteClientPayment(id).unwrap()
                        toggleSuccessAlert('Pago eliminado exitosamente')
                    }
                    navigate('/clientsPayments', { replace: true })
                } catch (error) {
                    toggleErrorAlert('Error al eliminar el pago')
                    console.error('Error al eliminar el pago:', error)
                }
            }
            deleteClientPaymentAsync()
        }
    }, [isDeleteTriggered, deleteClientPayment, id, navigate, toggleErrorAlert, toggleSuccessAlert]
)

    if(isLoading || !payment || isDeleting) return <SpinnerLoading />

    return (
        <SceneContainer>
            <Header title="Pago de cliente" subtitle="Detalles">
                <HeaderButton 
                    form={<ActionConfirmComponent model="Pago" onConfirm={handleDelete} isLoading={isDeleting} type="delete"/>}
                    type="delete"
                />
            </Header>
            <Box marginTop={'1rem'} width={'100%'}>
                <FlexBetween gap={1} flexDirection={isMobile ? 'column': 'row'} width={'100%'} alignItems={isMobile ? 'stretch' : 'flex-start'} mb={'1rem'}>
                    <DetailsCard size={isMobile ? "XXL" : "M"} flexGrow={1} isMobile={isMobile}>
                        <CustomTextItem isTitle>Información</CustomTextItem>
                        <CustomTextItem isTitle={false} tag="Fecha" icon={<CalendarMonthIcon fontSize={isMobile ? "small" : "medium"}/>}>
                            {getFormatedDate(payment?.createdAt || '')}
                        </CustomTextItem>
                        <CustomTextItem isTitle={false} tag="Cliente" icon={<PersonIcon fontSize={isMobile ? "small" : "medium"}/>}>
                            {payment?.client_name}
                        </CustomTextItem>
                        <CustomTextItem isTitle={false} tag="Balance actual" icon={<AttachMoneyIcon fontSize={isMobile ? "small" : "medium"}/>}>
                            {getFormatedValue(payment?.client_balance || 0)}
                        </CustomTextItem>
                    </DetailsCard>
                    <DetailsCard size={isMobile ? "XXL" : "M"} flexGrow={1} isMobile={isMobile}>
                        <CustomTextItem isTitle>Pago</CustomTextItem>
                        <CustomTextItem isTitle={false} tag="Total de pago" icon={<AttachMoneyIcon fontSize={isMobile ? "small" : "medium"}/>}>
                            {getFormatedValue(payment?.amount)}
                        </CustomTextItem>
                        <CustomTextItem isTitle={false} tag="Metodo de pago" icon={<PaymentIcon fontSize={isMobile ? "small" : "medium"}/>}>
                            {payment?.payment_method}
                        </CustomTextItem>
                    </DetailsCard>
                    <DetailsCard size={isMobile ? "XXL" : "M"} flexGrow={1} isMobile={isMobile}> 
                        <CustomTextItem isTitle>Adicional</CustomTextItem>
                        <CustomTextItem isTitle={false} tag="Venta" icon={<ReceiptIcon fontSize={isMobile ? "small" : "medium"}/>}>
                            {payment.sale_id ? 'Si' : 'No'}
                        </CustomTextItem>
                        <CustomTextItem isTitle={false} tag="Reporte" icon={<ListAltIcon fontSize={isMobile ? "small" : "medium"}/>}>
                            {payment.report_id ? 'Si' : 'No'}
                        </CustomTextItem>
                    </DetailsCard>
                </FlexBetween>
                <DetailsCard size={"XXL"} flexGrow={0} isMobile={isMobile} centerContent>
                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={2}>
                        <Typography variant="h4" textAlign={'center'}>Quieres ver mas pagos del cliente?</Typography>
                        <ToolbarButton handleClick={()=> handleClickToClient(payment?.client_id || '')} label="Ver detalle" icon={null}/>
                    </Box>
                </DetailsCard>
            </Box>
        </SceneContainer>
    )
}

export {PaymentDetails}