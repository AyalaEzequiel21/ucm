import { CustomCard } from "@/components/CustomCard"
import { CustomTextItem } from "@/components/CustomTextItem"
import { DetailsLayout } from "@/components/DetailsLayout"
import { FlexBetween } from "@/components/FlexBetween"
import { useGetClientByIdQuery } from "@/redux/api/clientApi"
import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue"
// import { IClient } from "@/utils/interfaces/IClient"
import { Typography } from "@mui/material"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

type ClientDetailsProps = object

const ClientDetails: React.FC<ClientDetailsProps> = () => {

    const {id} = useParams<{id: string}>()    
    const { isLoading, data} = useGetClientByIdQuery(id ? id : '')
    
    useEffect(()=>{

        console.log(data)
    },[data])

    if (isLoading) {
        return <div>Loading...</div>; // O un spinner, o lo que quieras mostrar mientras se cargan los datos.
    }
    
    return (
        <DetailsLayout title={data?.data.fullname ? data?.data.fullname : 'undefined'} >
            <FlexBetween>
                <CustomCard size="L">
                    <CustomTextItem label="Telefono" data={data?.data.phone} />/
                    <Typography>Telefono: {data?.data.phone}</Typography>
                    <Typography>Categoria: {data?.data.category === 'cat_1' ? 'Cargador' : 'Carnicero'}</Typography>
                    <Typography>Reparto: {data?.data.in_delivery ? 'Si' : 'No'}</Typography>
                </CustomCard>
                <CustomCard size="L">
                    <Typography>Balance: {getFormatedValue(data?.data.balance as number)}</Typography>
                </CustomCard >
                <CustomCard>

                </CustomCard>
            </FlexBetween>

        </DetailsLayout>
    )
}

export { ClientDetails }