import { DetailsCard } from "@/components/DetailsCard"
import { CustomTextItem } from "@/components/CustomTextItem"
import { DetailsLayout } from "@/components/DetailsLayout"
import { FlexBetween } from "@/components/FlexBetween"
import { useGetClientByIdQuery } from "@/redux/api/clientApi"
import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue"
import { IClient } from "@/utils/interfaces/IClient"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useScreenSize from "@/hooks/useScreenSize"
import PhoneIcon from '@mui/icons-material/Phone'
import SellIcon from '@mui/icons-material/Sell'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { getFormatedDate } from "@/utils/functionsHelper/getFormatedDate"

type ClientDetailsProps = object

const ClientDetails: React.FC<ClientDetailsProps> = () => {

    const {id} = useParams()
    const parsedId = id as string
    const {isMobile} = useScreenSize()
    const { isLoading, data} = useGetClientByIdQuery(parsedId)
    const client = data?.data as IClient
    
    useEffect(()=>{

        console.log(data)
    },[data])

    if (isLoading) {
        return <div>Loading...</div>; // O un spinner, o lo que quieras mostrar mientras se cargan los datos.
    }
    
    return (
        <DetailsLayout title={client.fullname ? client.fullname : 'undefined'} >
            <FlexBetween gap={1} flexDirection={isMobile ? 'column': 'row'}>
                <DetailsCard size={isMobile ? "XL" : "M"}>
                    <CustomTextItem isTitle={true}>Información Personal</CustomTextItem>
                    <CustomTextItem isTitle={false} tag="Telefono" icon={<PhoneIcon fontSize={isMobile ? "small" : "medium"}/>}>{client.phone}</CustomTextItem>
                    <CustomTextItem isTitle={false} tag="Categoria" icon={<SellIcon fontSize={isMobile ? "small" : "medium"}/>}>{client.category === 'cat_1'? 'Cargador' : 'Carnicero'}</CustomTextItem>
                    <CustomTextItem isTitle={false} tag="Registrado" icon={<CalendarMonthIcon fontSize={isMobile ? "small" : "medium"}/>}>{getFormatedDate(client.createdAt)}</CustomTextItem>
                    <CustomTextItem isTitle={false} tag="Reparto" icon={<LocalShippingIcon fontSize={isMobile ? "small" : "medium"}/>}>{client.in_delivery ? 'Si' : 'No'}</CustomTextItem>
                </DetailsCard>
                <DetailsCard size="XL">
                    <CustomTextItem isTitle={true}>Balance General</CustomTextItem>
                    <CustomTextItem isTitle={false} tag="Balance actual" icon={<AttachMoneyIcon fontSize={isMobile ? "small" : "medium"}/>}>{getFormatedValue(client.balance)}</CustomTextItem>
                    <CustomTextItem isTitle={false} tag="Total de pagos" icon={<AttachMoneyIcon fontSize={isMobile ? "small" : "medium"}/>}>{getFormatedValue(100000)}</CustomTextItem>
                    <CustomTextItem isTitle={false} tag="Total de compras" icon={<AttachMoneyIcon fontSize={isMobile ? "small" : "medium"}/>}>{getFormatedValue(500000)}</CustomTextItem>
                </DetailsCard >
                {/* <DetailsCard>

                </DetailsCard> */}
            </FlexBetween>

        </DetailsLayout>
    )
}

export { ClientDetails }