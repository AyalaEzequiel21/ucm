import { DetailsLayout } from "@/components/DetailsLayout"
import { useGetClientByIdQuery } from "@/redux/api/clientApi"
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
            <Typography>hola</Typography>
        </DetailsLayout>
    )
}

export { ClientDetails }