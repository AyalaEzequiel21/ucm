import { CustomTextItem } from "@/components/CustomTextItem"
import { DetailsCard } from "@/components/ui-components/DetailsCard"
import { FlexBetween } from "@/components/FlexBetween"
import { SpinnerLoading } from "@/components/ui-components/SpinnerLoading"
import useScreenSize from "@/hooks/useScreenSize"
import { useDeletePaymentToSupplierMutation, useGetPaymentToSupplierDetailsByIdQuery } from "@/redux/api/paymentToSupplierApi"
import { IPaymentToSupplierDetails } from "@/utils/interfaces/IPaymentToSupplier"
import { useNavigate, useParams } from "react-router-dom"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import PersonIcon from '@mui/icons-material/Person'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import PaymentIcon from '@mui/icons-material/Payment';
import { getFormatedDate } from "@/utils/functionsHelper/getFormatedDate"
import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue"
import { Box, Typography } from "@mui/material"
import { ToolbarButton } from "@/components/ToolbarButton"
import { SceneContainer } from "@/components/SceneContainer"
import { Header } from "@/components/Header"
import { useEffect, useState } from "react"
import { DeleteConfirmComponent } from "@/components/ui-components/DeleteConfirmComponent"
import { HeaderButton } from "@/components/ui-components/buttons/HeaderButton"

type PaymentToSupplierDetailsProps = object

const PaymentToSupplierDetails: React.FC<PaymentToSupplierDetailsProps> = () => {
    const {id} = useParams()
    const parsedId = id as string
    const {isMobile} = useScreenSize()
    const [isDeleteTriggered, setDeleteTriggered] = useState(false)
    const {data, isLoading} = useGetPaymentToSupplierDetailsByIdQuery(parsedId, {skip: isDeleteTriggered})
    const paymentToSupplier = data?.data as IPaymentToSupplierDetails
    const [deletePaymentToSupplier, {isLoading: isDeleting}] = useDeletePaymentToSupplierMutation()
    const navigate = useNavigate()

    const handleClickToSupplier = (id: string) => {
        navigate(`/suppliers/supplier/${id}`)
    }

    const handleDelete = () => setDeleteTriggered(true)

    useEffect(() => {
        if(isDeleteTriggered) {
            const deletePaymentToSupplierAsync = async () => {
                try {
                    if (parsedId) {
                        await deletePaymentToSupplier(parsedId).unwrap();
                    }
                    navigate('/paymentsToSuppliers', { replace: true });
                } catch (error) {
                    console.error('Error al eliminar el pago:', error);
                }
            }
            deletePaymentToSupplierAsync()
        }
    }, [isDeleteTriggered, deletePaymentToSupplier, parsedId, navigate])

    if(isLoading || !paymentToSupplier) return <SpinnerLoading />

    return (
        <SceneContainer>
            <Header title="Pago a proveedor" subtitle="Detalles">
                <HeaderButton
                    form={<DeleteConfirmComponent model="Pago a proveedor" onConfirm={handleDelete} isLoading={isDeleting}/>}
                    type="delete"
                />
            </Header>
            <Box marginTop={'1rem'} width={'100%'}>
                <FlexBetween gap={2} flexDirection={isMobile ? 'column': 'row'} width={'100%'} alignItems={isMobile ? 'stretch' : 'flex-start'} mb={'1rem'}>
                    <DetailsCard size={isMobile ? "XXL" : "M"} flexGrow={1} isMobile={isMobile}>
                        <CustomTextItem isTitle>Información</CustomTextItem>
                        <CustomTextItem isTitle={false} tag="Fecha" icon={<CalendarMonthIcon fontSize={isMobile ? "small" : "medium"}/>}>
                            {getFormatedDate(paymentToSupplier?.createdAt || '')}
                        </CustomTextItem>
                        <CustomTextItem isTitle={false} tag="Cliente" icon={<PersonIcon fontSize={isMobile ? "small" : "medium"}/>}>
                            {paymentToSupplier?.supplier_name}
                        </CustomTextItem>
                        <CustomTextItem isTitle={false} tag="Balance actual" icon={<AttachMoneyIcon fontSize={isMobile ? "small" : "medium"}/>}>
                            {getFormatedValue(paymentToSupplier?.supplier_balance || 0)}
                        </CustomTextItem>
                    </DetailsCard>
                    <DetailsCard size={isMobile ? "XXL" : "M"} flexGrow={1} isMobile={isMobile}>
                        <CustomTextItem isTitle>Pago</CustomTextItem>
                        <CustomTextItem isTitle={false} tag="Total de pago" icon={<AttachMoneyIcon fontSize={isMobile ? "small" : "medium"}/>}>
                            {getFormatedValue(paymentToSupplier?.total_payment)}
                        </CustomTextItem>
                        <CustomTextItem isTitle={false} tag="Metodo de pago" icon={<PaymentIcon fontSize={isMobile ? "small" : "medium"}/>}>
                            {paymentToSupplier?.payment_method}
                        </CustomTextItem>
                    </DetailsCard>
                </FlexBetween>
                <DetailsCard size={"XXL"} flexGrow={0} isMobile={isMobile} centerContent>
                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={2} >
                        <Typography variant="h4" textAlign={'center'}>Quieres ver mas pagos al proveedor?</Typography>
                        <ToolbarButton handleClick={()=> handleClickToSupplier(paymentToSupplier?.supplier_id || '')} label="Ver detalle" icon={null}/>
                    </Box>
                </DetailsCard>
            </Box>
        </SceneContainer>
    )
}

export {PaymentToSupplierDetails}