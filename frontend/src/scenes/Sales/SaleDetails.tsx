import { CustomTextItem } from "@/components/CustomTextItem"
import { DetailsCard } from "@/components/DetailsCard"
import { DetailsLayout } from "@/components/DetailsLayout"
import { FlexBetween } from "@/components/FlexBetween"
import useScreenSize from "@/hooks/useScreenSize"
import { useGetSaleDetailsByIdQuery } from "@/redux/api/saleApi"
import { ISaleDetails } from "@/utils/interfaces/ISale"
import { Typography } from "@mui/material"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import PersonIcon from '@mui/icons-material/Person';
import { getFormatedDate } from "@/utils/functionsHelper/getFormatedDate"

type SaleDetailsProps = object

const SaleDetails: React.FC<SaleDetailsProps> = () => {

    const {id} = useParams()
    const parsedId = id as string
    const {isMobile} = useScreenSize()
    const { isLoading, data} = useGetSaleDetailsByIdQuery(parsedId)
    const sale = data?.data as ISaleDetails

    useEffect(() => {
        console.log(sale);
        
    }, [sale])

    if(isLoading || !sale) return <div>Cargando...</div>

    return (
        <DetailsLayout title={"Venta"}>
            <Typography>{sale.client_name}</Typography>
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
                    <CustomTextItem isTitle>Información</CustomTextItem>
                    <CustomTextItem isTitle={false} tag="Fecha" icon={<CalendarMonthIcon fontSize={isMobile ? "small" : "medium"}/>}>
                        {getFormatedDate(sale?.createdAt)}
                    </CustomTextItem>
                    <CustomTextItem isTitle={false} tag="Cliente" icon={<PersonIcon fontSize={isMobile ? "small" : "medium"}/>}>
                        {sale?.client_name}
                    </CustomTextItem>
                </DetailsCard>
                {/* <DetailsCard size={isMobile ? "XXL" : "M"} flexGrow={1} isMobile={isMobile}> */}
                    
                {/* </DetailsCard> */}
            </FlexBetween>
        </DetailsLayout>
    )
}

export {SaleDetails}