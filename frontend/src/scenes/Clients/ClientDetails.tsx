import { DetailsCard } from "@/components/DetailsCard"
import { CustomTextItem } from "@/components/CustomTextItem"
import { DetailsLayout } from "@/components/DetailsLayout"
import { FlexBetween } from "@/components/FlexBetween"
import { useGetClientByIdQuery } from "@/redux/api/clientApi"
import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue"
import { IClient } from "@/utils/interfaces/IClient"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useScreenSize from "@/hooks/useScreenSize"
import PhoneIcon from '@mui/icons-material/Phone'
import SellIcon from '@mui/icons-material/Sell'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { getFormatedDate } from "@/utils/functionsHelper/getFormatedDate"
import { MultiTables, TableExtended } from "@/components/forms/MultiTables"
import { GridColDef } from "@mui/x-data-grid"
import { renderButtonPrincipal } from "@/utils/functionsHelper/renderButtonPrincipal"
import { useGetAllClientPaymentsByClientIdQuery } from "@/redux/api/clientPaymentApi"
import { useGetAllSalesByClientIdQuery } from "@/redux/api/saleApi"

type ClientDetailsProps = object

const ClientDetails: React.FC<ClientDetailsProps> = () => {

    const {id} = useParams()
    const parsedId = id as string
    const {isMobile} = useScreenSize()
    const { isLoading, data} = useGetClientByIdQuery(parsedId)
    const client = data?.data as IClient
    const navigate = useNavigate()
    const {data: payments, isLoading: loadingPayments} = useGetAllClientPaymentsByClientIdQuery(parsedId)
    const {data: sales, isLoading: loadingSales} = useGetAllSalesByClientIdQuery(parsedId)

    const handleClickSale = (id: string) => {
        navigate(`/sales/sale/${id}`)
    }

    const handleClickPayment = (id: string) => {
        navigate(`/payments/payment/${id}`)
    }

    const  columnsBaseSales: GridColDef[] = [
        { field: 'createdAt', headerName: 'Fecha', flex: 0.5, renderCell(value){return renderButtonPrincipal(value.row._id, getFormatedDate(value.row.createdAt), ()=> handleClickSale(value.row._id))} },
        { field: 'total_sale', headerName: 'Total', flex: 0.3, renderCell(value){return getFormatedValue(value.row.total_sale)}},
    ]

    const columnsBasePayments: GridColDef[] = [
        { field: 'createdAt', headerName: 'Fecha', flex: 0.5, renderCell(value){return renderButtonPrincipal(value.row._id, getFormatedDate(value.row.createdAt), ()=> handleClickPayment(value.row._id))} },
        { field: 'amount', headerName: 'Total', flex: 0.3, renderCell(value){return getFormatedValue(value.row.amount)}},
    ]
    const columnsTabletPayments: GridColDef[] = [
        { field: 'payment_method', headerName: 'Metodo', flex: 0.5 },
    ]

    const tables: TableExtended<T>[] = [
        {
            label: 'Pagos',
            rows: payments?.data || [],
            isFilterName: false,
            columnsBase: columnsBasePayments,
            addedColumnsTable: columnsTabletPayments,
            isLoading: loadingPayments
        },
        {
            label: 'Ventas',
            rows: sales?.data || [],
            isFilterName: false,
            columnsBase: columnsBaseSales,
            isLoading: loadingSales
        }
    ]
    
    useEffect(()=>{
        console.log(sales)
    },[data])

    // const 

    if (isLoading) {
        return <div>Loading...</div>; // O un spinner, o lo que quieras mostrar mientras se cargan los datos.
    }
    
    return (
        <DetailsLayout title={client.fullname ? client.fullname : 'undefined'} >
            <FlexBetween gap={1} flexDirection={isMobile ? 'column': 'row'} width={'100%'} alignItems={isMobile ? 'stretch' : 'flex-start'} mb={'1rem'}>
                <DetailsCard size={isMobile ? "XXL" : "M"} flexGrow={1} isMobile={isMobile}>
                    <CustomTextItem isTitle={true}>Información Personal</CustomTextItem>
                    <CustomTextItem isTitle={false} tag="Telefono" icon={<PhoneIcon fontSize={isMobile ? "small" : "medium"}/>}>{client.phone}</CustomTextItem>
                    <CustomTextItem isTitle={false} tag="Categoria" icon={<SellIcon fontSize={isMobile ? "small" : "medium"}/>}>{client.category === 'cat_1'? 'Cargador' : 'Carnicero'}</CustomTextItem>
                    <CustomTextItem isTitle={false} tag="Registrado" icon={<CalendarMonthIcon fontSize={isMobile ? "small" : "medium"}/>}>{getFormatedDate(client.createdAt)}</CustomTextItem>
                    {/* <CustomTextItem isTitle={false} tag="Reparto" icon={<LocalShippingIcon fontSize={isMobile ? "small" : "medium"}/>}>{client.in_delivery ? 'Si' : 'No'}</CustomTextItem> */}
                </DetailsCard>
                <DetailsCard size={isMobile ? "XXL" : "M"} flexGrow={1} isMobile={isMobile}>
                    <CustomTextItem isTitle={true}>Balance General</CustomTextItem>
                    <CustomTextItem isTitle={false} tag="Balance actual" icon={<AttachMoneyIcon fontSize={isMobile ? "small" : "medium"}/>}>{getFormatedValue(client.balance)}</CustomTextItem>
                    <CustomTextItem isTitle={false} tag="Total pagos" icon={<AttachMoneyIcon fontSize={isMobile ? "small" : "medium"}/>}>{getFormatedValue(100000)}</CustomTextItem>
                    <CustomTextItem isTitle={false} tag="Total compras" icon={<AttachMoneyIcon fontSize={isMobile ? "small" : "medium"}/>}>{getFormatedValue(500000)}</CustomTextItem>
                </DetailsCard >
                <DetailsCard size={isMobile ? "XXL" : "M"} flexGrow={1} isMobile={isMobile}>
                    <CustomTextItem isTitle={true}>Historial</CustomTextItem>
                    <CustomTextItem isTitle={false} tag="Ultima compra" icon={<CalendarMonthIcon fontSize={isMobile ? "small" : "medium"}/>}>{getFormatedDate(client.createdAt)}</CustomTextItem>
                    <CustomTextItem isTitle={false} tag="Ultimo pago" icon={<CalendarMonthIcon fontSize={isMobile ? "small" : "medium"}/>}>{getFormatedDate(client.createdAt)}</CustomTextItem>
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
    )
}

export { ClientDetails }