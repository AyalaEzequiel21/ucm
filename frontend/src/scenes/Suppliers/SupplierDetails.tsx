import { DetailsLayout } from "@/components/DetailsLayout"
import { FlexBetween } from "@/components/FlexBetween"
import { MultiTables, TableExtended } from "@/components/MultiTables"
import useScreenSize from "@/hooks/useScreenSize"
import { useGetSupplierDetailsByIdQuery } from "@/redux/api/supplierApi"
import { getFormatedDate } from "@/utils/functionsHelper/getFormatedDate"
import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue"
import { renderButtonPrincipal } from "@/utils/functionsHelper/renderButtonPrincipal"
import { IPaymentsOfSupplierDetails, IPurchasesOfSupplierDetails, ISupplierDetails } from "@/utils/interfaces/ISupplier"
import { GridColDef } from "@mui/x-data-grid"
import { useEffect } from "react"
import PhoneIcon from '@mui/icons-material/Phone'
import SellIcon from '@mui/icons-material/Sell'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { useNavigate, useParams } from "react-router-dom"
import { SpinnerLoading } from "@/components/ui-components/SpinnerLoading"
import { CustomTextItem } from "@/components/CustomTextItem"
import { DetailsCard } from "@/components/ui-components/DetailsCard"
import { SceneContainer } from "@/components/SceneContainer"
import { Header } from "@/components/Header"

type SupplierDetailsProps = object

const SupplierDetails: React.FC<SupplierDetailsProps> = () => {
    
    const {id} = useParams()
    const parsedId = id as string
    const {isMobile} = useScreenSize()
    const {isLoading, data} = useGetSupplierDetailsByIdQuery(parsedId)
    const supplierDetails = data?.data as ISupplierDetails
    const navigate = useNavigate()

    const handleClickPurchase = (id: string) => {
        navigate(`/purchases/purchase/${id}`)
    }

    const handleClickPayment = (id: string) => {
        navigate(`/paymentsToSuppliers/payment/${id}`)
    }

    const columnsBasePurchases: GridColDef[] = [
        { field: 'createdAt', headerName: 'Fecha', flex: 0.5, renderCell(value){
            if (!value.row) return null; // Evita errores si `value.row` es undefined o null
            return renderButtonPrincipal(value.row._id, getFormatedDate(value.row.createdAt), () => handleClickPurchase(value.row._id));
        } },
        { field: 'total_purchase', headerName: 'Total', flex: 0.3, renderCell(value){return getFormatedValue(value.row.total_purchase)}},
    ]

    const columnsBasePayments: GridColDef[] = [
        { field: 'createdAt', headerName: 'Fecha', flex: 0.5, renderCell(value){
            if (!value.row) return null; // Evita errores si `value.row` es undefined o null
            return renderButtonPrincipal(value.row._id, getFormatedDate(value.row.createdAt), () => handleClickPayment(value.row._id));
        } },
        { field: 'total_payment', headerName: 'Total', flex: 0.3, renderCell(value){return getFormatedValue(value.row.total_payment)}},
    ]

    const columnsTabletPayments: GridColDef[] = [
        { field: 'payment_method', headerName: 'Metodo', flex: 0.5},
    ]

    const tables: TableExtended<IPaymentsOfSupplierDetails|IPurchasesOfSupplierDetails>[] = [
        {
            label: 'Pagos',
            rows: supplierDetails?.payments || [],
            isFilterName: false,
            columnsBase: columnsBasePayments,
            addedColumnsTable: columnsTabletPayments,
            isLoading: isLoading
        },
        {
            label: 'Ventas',
            rows: supplierDetails?.purchases || [],
            isFilterName: false,
            columnsBase: columnsBasePurchases,
            isLoading: isLoading
        }
    ]

    useEffect(() => {
        console.log(data);
        
    }, [data])

    if (isLoading || !supplierDetails) return <SpinnerLoading />


    return (
        <SceneContainer>
            <Header title={supplierDetails.supplier_name} subtitle="Detalles">
            </Header>    
            <DetailsLayout>
                <FlexBetween gap={1} flexDirection={isMobile ? 'column': 'row'} width={'100%'} alignItems={isMobile ? 'stretch' : 'flex-start'} mb={'1rem'}>
                    <DetailsCard size={isMobile ? "XXL" : "M"} flexGrow={1} isMobile={isMobile}>
                        <CustomTextItem isTitle={true}>Información Personal</CustomTextItem>
                        <CustomTextItem isTitle={false} tag="Telefono" icon={<PhoneIcon fontSize={isMobile ? "small" : "medium"}/>}>{supplierDetails.phone}</CustomTextItem>
                        <CustomTextItem isTitle={false} tag="Producto" icon={<SellIcon fontSize={isMobile ? "small" : "medium"}/>}>{supplierDetails.primeProduct}</CustomTextItem>
                        <CustomTextItem isTitle={false} tag="Registrado" icon={<CalendarMonthIcon fontSize={isMobile ? "small" : "medium"}/>}>{getFormatedDate(supplierDetails.createdAt.toString())}</CustomTextItem>
                    </DetailsCard>
                    <DetailsCard size={isMobile ? "XXL" : "M"} flexGrow={1} isMobile={isMobile}>
                        <CustomTextItem isTitle={true}>Balance General</CustomTextItem>
                        <CustomTextItem isTitle={false} tag="Balance actual" icon={<AttachMoneyIcon fontSize={isMobile ? "small" : "medium"}/>}>{getFormatedValue(supplierDetails.balance)}</CustomTextItem>
                        <CustomTextItem isTitle={false} tag="Total pagos" icon={<AttachMoneyIcon fontSize={isMobile ? "small" : "medium"}/>}>{getFormatedValue(supplierDetails.totalAmountOfPayments)}</CustomTextItem>
                        <CustomTextItem isTitle={false} tag="Total compras" icon={<AttachMoneyIcon fontSize={isMobile ? "small" : "medium"}/>}>{getFormatedValue(supplierDetails.totalAmountOfPurchases)}</CustomTextItem>
                    </DetailsCard >
                    <DetailsCard size={isMobile ? "XXL" : "M"} flexGrow={1} isMobile={isMobile}>
                        <CustomTextItem isTitle={true}>Historial</CustomTextItem>
                        <CustomTextItem isTitle={false} tag="Ultima compra" icon={<CalendarMonthIcon fontSize={isMobile ? "small" : "medium"}/>}>{getFormatedDate(supplierDetails.lastPurchase !== null ? supplierDetails.lastPurchase.toString() : '')}</CustomTextItem>
                        <CustomTextItem isTitle={false} tag="Ultimo pago" icon={<CalendarMonthIcon fontSize={isMobile ? "small" : "medium"}/>}>{getFormatedDate(supplierDetails.lastPayment !== null ? supplierDetails.lastPayment.toString() : '')}</CustomTextItem>
                    </DetailsCard>
                </FlexBetween>
                <FlexBetween>
                    <DetailsCard size="XXL" flexGrow={1} isMobile={isMobile}>
                        <MultiTables 
                            tables={tables}
                            halfHeight
                        />
                    </DetailsCard>
                </FlexBetween>
            </DetailsLayout>
        </SceneContainer>
    )
}

export {SupplierDetails}