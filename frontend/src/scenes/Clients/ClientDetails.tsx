import { DetailsLayout } from "@/components/DetailsLayout"
import { useGetClientByIdQuery } from "@/redux/api/clientApi"
import { IClient } from "@/utils/interfaces/IClient"
import { Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

type ClientDetailsProps = object

const ClientDetails: React.FC<ClientDetailsProps> = () => {

    const {id} = useParams<{id: string}>()    
    const { isLoading, data} = useGetClientByIdQuery(id)
    const [client, setCLient] = useState<IClient>()
    

    useEffect(()=>{
        if(data) {
            setCLient(data)
        }
        console.log(data)
    },[data])
    
    return (
        <DetailsLayout title={client.fullname} >
            <Typography>hola</Typography>
        </DetailsLayout>
    )
}

export { ClientDetails }