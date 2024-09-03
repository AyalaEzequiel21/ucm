import { DetailsCard } from "@/components/DetailsCard"
import { CustomTextItem } from "@/components/CustomTextItem"
import { DetailsLayout } from "@/components/DetailsLayout"
import { FlexBetween } from "@/components/FlexBetween"
import { useGetClientDetailsByIdQuery } from "@/redux/api/clientApi"
import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue"
import { IClientDetails, IPaymentsOfClientDetails, ISalesOfClientDetails } from "@/utils/interfaces/IClient"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useScreenSize from "@/hooks/useScreenSize"
import PhoneIcon from '@mui/icons-material/Phone'
import SellIcon from '@mui/icons-material/Sell'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { getFormatedDate } from "@/utils/functionsHelper/getFormatedDate"
import { MultiTables, TableExtended } from "@/components/MultiTables"
import { GridColDef } from "@mui/x-data-grid"
import { renderButtonPrincipal } from "@/utils/functionsHelper/renderButtonPrincipal"

type ClientDetailsProps = object

const ClientDetails: React.FC<ClientDetailsProps> = () => {

    const {id} = useParams()
    const parsedId = id as string
    const {isMobile} = useScreenSize()
    const { isLoading, data} = useGetClientDetailsByIdQuery(parsedId)
    const client = data?.data as IClientDetails
    const navigate = useNavigate()

    const handleClickSale = (id: string) => {
        navigate(`/sales/sale/${id}`)
    }

    const handleClickPayment = (id: string) => {
        navigate(`/payments/payment/${id}`)
    }

    const  columnsBaseSales: GridColDef[] = [
        { field: 'createdAt', headerName: 'Fecha', flex: 0.5, renderCell(value){
            if (!value.row) return null; // Evita errores si `value.row` es undefined o null
            return renderButtonPrincipal(value.row._id, getFormatedDate(value.row.createdAt), () => handleClickSale(value.row._id));
        } },
        { field: 'total_sale', headerName: 'Total', flex: 0.3, renderCell(value){return getFormatedValue(value.row.total_sale)}},
    ]

    const columnsBasePayments: GridColDef[] = [
        { field: 'createdAt', headerName: 'Fecha', flex: 0.5, renderCell(value){
            if (!value.row) return null; // Evita errores si `value.row` es undefined o null
            return renderButtonPrincipal(value.row._id, getFormatedDate(value.row.createdAt), () => handleClickPayment(value.row._id));
        } },
        { field: 'amount', headerName: 'Total', flex: 0.3, renderCell(value){return getFormatedValue(value.row.amount)}},
    ]
    const columnsTabletPayments: GridColDef[] = [
        { field: 'payment_method', headerName: 'Metodo', flex: 0.5 },
    ]

    const tables: TableExtended<IPaymentsOfClientDetails|ISalesOfClientDetails>[] = [
        {
            label: 'Pagos',
            rows: client?.payments || [],
            isFilterName: false,
            columnsBase: columnsBasePayments,
            addedColumnsTable: columnsTabletPayments,
            isLoading: isLoading
        },
        {
            label: 'Ventas',
            rows: client?.sales || [],
            isFilterName: false,
            columnsBase: columnsBaseSales,
            isLoading: isLoading
        }
    ]
    
    useEffect(()=>{
        console.log(data)
    },[data])


    if (isLoading || !client) return <div>Cargando...</div>

    
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
                    <CustomTextItem isTitle={false} tag="Total pagos" icon={<AttachMoneyIcon fontSize={isMobile ? "small" : "medium"}/>}>{getFormatedValue(client.totalAmountOfPayments)}</CustomTextItem>
                    <CustomTextItem isTitle={false} tag="Total compras" icon={<AttachMoneyIcon fontSize={isMobile ? "small" : "medium"}/>}>{getFormatedValue(client.totalAmountOfSales)}</CustomTextItem>
                </DetailsCard >
                <DetailsCard size={isMobile ? "XXL" : "M"} flexGrow={1} isMobile={isMobile}>
                    <CustomTextItem isTitle={true}>Historial</CustomTextItem>
                    <CustomTextItem isTitle={false} tag="Ultima compra" icon={<CalendarMonthIcon fontSize={isMobile ? "small" : "medium"}/>}>{getFormatedDate(client.lastSale !== null ? client.lastSale : '')}</CustomTextItem>
                    <CustomTextItem isTitle={false} tag="Ultimo pago" icon={<CalendarMonthIcon fontSize={isMobile ? "small" : "medium"}/>}>{getFormatedDate(client.lastPayment !== null ? client.lastPayment : '')}</CustomTextItem>
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