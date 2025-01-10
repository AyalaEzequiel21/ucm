import { CustomTextItem } from "@/components/CustomTextItem"
import { DetailsCard } from "@/components/ui-components/DetailsCard"
import { FlexBetween } from "@/components/FlexBetween"
import useScreenSize from "@/hooks/useScreenSize"
import { useDeleteSaleMutation, useGetSaleDetailsByIdQuery } from "@/redux/api/saleApi"
import { IDetailsSale } from "@/utils/interfaces/ISale"
import { useNavigate, useParams } from "react-router-dom"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import PersonIcon from '@mui/icons-material/Person'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CalculateIcon from '@mui/icons-material/Calculate'
import PaymentIcon from '@mui/icons-material/Payment';
import { getFormatedDate } from "@/utils/functionsHelper/getFormatedDate"
import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue"
import { CustomDatGrid } from "@/components/CustomDataGrid"
import { GridColDef } from "@mui/x-data-grid"
import { SpinnerLoading } from "@/components/ui-components/SpinnerLoading"
import { SceneContainer } from "@/components/SceneContainer"
import { Header } from "@/components/Header"
import { HeaderButton } from "@/components/ui-components/buttons/HeaderButton"
import { SaleModifyForm } from "@/components/forms/modify/SaleModifyForm"
import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { useModalAlert } from "@/hooks/useModalAlert"
import { ActionConfirmComponent } from "@/components/ui-components/ActionConfirmComponent"

type SaleDetailsProps = object

const SaleDetails: React.FC<SaleDetailsProps> = () => {

    const {id} = useParams()
    const parsedId = id as string
    const {isMobile} = useScreenSize()
    const [isDeleteTriggered, setDeleteTriggered] = useState(false)
    const { isLoading, data} = useGetSaleDetailsByIdQuery(parsedId, {skip: isDeleteTriggered})
    const sale = data?.data as IDetailsSale
    const { toggleErrorAlert, toggleSuccessAlert } = useModalAlert()
    const [deleteSale, {isLoading: isDeleting}] = useDeleteSaleMutation()
    const navigate = useNavigate()

    const columns: GridColDef[] = [
        { field: 'product_name', headerName: 'Producto', flex: 0.5 },
        { field: 'price', headerName: 'Precio', flex: 0.3, renderCell(value){return getFormatedValue(value.row.price)}},
        { field: 'quantity', headerName: 'Cantidad', flex: 0.5, renderCell(value){return `${value.row.quantity} kg`} },
        { field: 'total', headerName: 'Total', flex: 0.3, renderCell: (value) => {
            const total = value.row.quantity * value.row.price;
            return getFormatedValue(total)
        }},
    ]

    useEffect(() => {
        if (isDeleteTriggered) {
            const deleteSaleAsync = async () => {
            try {
                if (id) {
                await deleteSale(id).unwrap()
                toggleSuccessAlert('Venta eliminada exitosamente')
            }
            navigate('/sales', { replace: true })
            } catch (error) {
                toggleErrorAlert('Error al eliminar la venta')
                console.error('Error al eliminar la venta:', error)
            }
        }
    
        deleteSaleAsync();
        }
    }, [isDeleteTriggered, id, deleteSale, navigate, toggleErrorAlert, toggleSuccessAlert])

    const handleDelete = () => {
        setDeleteTriggered(true)
    }

    if(isLoading || !sale || isDeleting) return <SpinnerLoading />

    return (
        <SceneContainer>
            <Header title="Detalle de venta" subtitle={sale?.client_name}>
                <HeaderButton
                    form={<SaleModifyForm saleData={sale}/>}
                    type="edit"
                />
                <HeaderButton
                    form={<ActionConfirmComponent model="Venta" onConfirm={()=> handleDelete()} isLoading={isDeleting} type="delete"/>}
                    type="delete"
                />
            </Header>
            <Box marginTop={'1rem'} width={'100%'}>
                <FlexBetween gap={1} flexDirection={isMobile ? 'column': 'row'} width={'100%'} alignItems={isMobile ? 'stretch' : 'flex-start'} mb={'1rem'}>
                    <DetailsCard size={isMobile ? "XXL" : "M"} flexGrow={1} isMobile={isMobile}>
                        <CustomTextItem isTitle>Información</CustomTextItem>
                        <CustomTextItem isTitle={false} tag="Fecha" icon={<CalendarMonthIcon fontSize={isMobile ? "small" : "medium"}/>}>
                            {getFormatedDate(sale?.createdAt)}
                        </CustomTextItem>
                        <CustomTextItem isTitle={false} tag="Cliente" icon={<PersonIcon fontSize={isMobile ? "small" : "medium"}/>}>
                            {sale?.client_name}
                        </CustomTextItem>
                    </DetailsCard>
                    <DetailsCard size={isMobile ? "XXL" : "M"} flexGrow={1} isMobile={isMobile}>
                        <CustomTextItem isTitle>Totales</CustomTextItem>
                        <CustomTextItem isTitle={false} tag="Total de venta" icon={<AttachMoneyIcon fontSize={isMobile ? "small" : "medium"}/>}>
                            {getFormatedValue(sale?.total_sale)}
                        </CustomTextItem>
                        <CustomTextItem isTitle={false} tag="Total de kilos" icon={<CalculateIcon fontSize={isMobile ? "small" : "medium"}/>}>
                            {sale?.totalQuantity}Kg
                        </CustomTextItem>
                    </DetailsCard>
                    <DetailsCard size={isMobile ? "XXL" : "M"} flexGrow={1} isMobile={isMobile}> 
                        <CustomTextItem isTitle>Pago</CustomTextItem>
                        {sale.payment? 
                            <>
                                <CustomTextItem isTitle={false} tag="Metodo de pago" icon={<PaymentIcon fontSize={isMobile ? "small" : "medium"}/>}>
                                    {sale.payment.payment_method}
                                </CustomTextItem>
                                <CustomTextItem isTitle={false} tag="Total de pago" icon={<AttachMoneyIcon fontSize={isMobile ? "small" : "medium"}/>}>
                                    {getFormatedValue(sale.payment.amount)}
                                </CustomTextItem>
                            </>
                            : 
                            <CustomTextItem isTitle={false} tag="No realizado" icon={<AttachMoneyIcon fontSize={isMobile ? "small" : "medium"}/>}>
                                0
                            </CustomTextItem>
                        }
                    </DetailsCard>
                </FlexBetween>
                <FlexBetween>
                    <DetailsCard size="XXL" flexGrow={1} isMobile={isMobile}>
                        <CustomDatGrid
                            rows={sale?.details || []}
                            isFilterName={false}
                            columnsBase={columns}
                            isLoading={isLoading}
                            lightMode={true}

                        />
                    </DetailsCard>
                </FlexBetween>
            </Box>
        </SceneContainer>
    )
}

export {SaleDetails}