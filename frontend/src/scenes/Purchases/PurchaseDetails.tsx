import { CustomTextItem } from "@/components/CustomTextItem"
import { DetailsCard } from "@/components/ui-components/DetailsCard"
import { FlexBetween } from "@/components/FlexBetween"
import { SpinnerLoading } from "@/components/ui-components/SpinnerLoading"
import useScreenSize from "@/hooks/useScreenSize"
import { useGetPurchaseDetailsByIdQuery } from "@/redux/api/purchaseApi"
import { getFormatedDate } from "@/utils/functionsHelper/getFormatedDate"
import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue"
import { IPurchaseForDetails } from "@/utils/interfaces/IPurchase"
import { GridColDef } from "@mui/x-data-grid"
import { useNavigate, useParams } from "react-router-dom"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import PersonIcon from '@mui/icons-material/Person'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { CustomDatGrid } from "@/components/CustomDataGrid"
import { Box } from "@mui/material"
import ListAltIcon from '@mui/icons-material/ListAlt';
import { SceneContainer } from "@/components/SceneContainer"
import { Header } from "@/components/Header"
import { HeaderButton } from "@/components/ui-components/buttons/HeaderButton"
import { PurchaseModifyForm } from "@/components/forms/modify/PurchaseModifyForm"
import { CustomButton } from "@/components/ui-components/buttons/CustomButton"


type PurchaseDetailsProps = object

const PurchaseDetails: React.FC<PurchaseDetailsProps> = () => {

    const {id} = useParams()
    const parseId = id as string
    const {isMobile} = useScreenSize()
    const { isLoading, data} = useGetPurchaseDetailsByIdQuery(parseId)
    const purchase = data?.data as IPurchaseForDetails
    const navigate = useNavigate()

    const columns: GridColDef[] = [
        { field: 'product_name', headerName: 'Producto', flex: 0.5 },
        { field: 'unity_price', headerName: 'Precio', flex: 0.3, renderCell(value){return getFormatedValue(value.row.unity_price)}},
        { field: 'quantity', headerName: 'Cantidad', flex: 0.5, renderCell(value){return `${value.row.quantity} kg`}},
        { field: 'total', headerName: 'Total', flex: 0.3, renderCell: (value) => {
            const total = value.row.quantity * value.row.unity_price;
            return getFormatedValue(total)
        }},
    ]
    const handleToSupplier = (supplier_id: string) => {
        navigate(`/suppliers/supplier/${supplier_id}`)
    }

    if(isLoading || !purchase) return <SpinnerLoading />

    return (
        <SceneContainer>
            <Header title="Compra a proveedor" subtitle="Detalles">
                <HeaderButton
                    form={<PurchaseModifyForm purchaseData={purchase}/>}
                    model="Compra a proveedor"
                    type="edit"
                />
            </Header>
            <Box marginTop={'1rem'} width={'100%'}>
                <FlexBetween gap={1} flexDirection={isMobile ? 'column': 'row'} width={'100%'} alignItems={isMobile ? 'stretch' : 'flex-start'} mb={'1rem'}>
                    <DetailsCard size={isMobile ? "XXL" : "M"} flexGrow={1} isMobile={isMobile}>
                        <CustomTextItem isTitle>Información</CustomTextItem>
                        <CustomTextItem isTitle={false} tag="Fecha" icon={<CalendarMonthIcon fontSize={isMobile ? "small" : "medium"}/>}>
                            {getFormatedDate(purchase?.createdAt)}
                        </CustomTextItem>
                        <CustomTextItem isTitle={false} tag="Proveedor" icon={<PersonIcon fontSize={isMobile ? "small" : "medium"}/>}>
                            {purchase?.supplier_name}
                        </CustomTextItem>
                        <CustomTextItem isTitle={false} tag="Balance actual" icon={<AttachMoneyIcon fontSize={isMobile ? "small" : "medium"}/>}>{getFormatedValue(purchase.supplierBalance)}</CustomTextItem>
                        
                    </DetailsCard>
                    <DetailsCard size={isMobile ? "XXL" : "M"} flexGrow={1} isMobile={isMobile}>
                        <CustomTextItem isTitle>Totales</CustomTextItem>
                        <CustomTextItem isTitle={false} tag="Total de compra" icon={<AttachMoneyIcon fontSize={isMobile ? "small" : "medium"}/>}>
                            {getFormatedValue(purchase.total_purchase)}
                        </CustomTextItem>
                        <CustomTextItem isTitle={false} tag="Cantidad de pagos" icon={<ListAltIcon fontSize={isMobile ? "small" : "medium"}/>}>{purchase.paymentsQuantity}</CustomTextItem>
                    </DetailsCard>
                    <DetailsCard size={isMobile ? "XXL" : "M"} flexGrow={1} isMobile={isMobile}> 
                        <CustomTextItem isTitle>Detalles del proveedor</CustomTextItem>
                        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} width={'100%'} height={'100%'} mt={'3rem'}>
                            <CustomButton mode="light" label="Ir a proveedor" onClick={()=> handleToSupplier(purchase?.supplier_id || '')} icon={<PersonIcon/>}/>
                        </Box>
                    </DetailsCard>
                </FlexBetween>
                <FlexBetween>
                    <DetailsCard size="XXL" flexGrow={1} isMobile={isMobile}>
                        <CustomDatGrid
                            rows={purchase?.purchaseDetail || []}
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

export {PurchaseDetails}
