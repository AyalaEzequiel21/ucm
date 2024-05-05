import { GeneralDatGrid } from "@/components/GeneralDataGrid"
import { Header } from "@/components/Header"
import { SceneContainer } from "@/components/SceneContainer"
import { getSomeClients } from "@/utils/dataUtils/dataMock"
import { IClient } from "@/utils/interfaces/IClient"
import { Box, Button } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid"


type ClientsProps = object

const Clients: React.FC<ClientsProps> = () => {

    const clients = getSomeClients()

    const handleDetailsClick = (client: IClient) => {
        console.log(client)
    }

    const columns: GridColDef[] = [
        { field: 'fullname', headerName: 'Cliente', flex: 1 },
        { field: 'category', headerName: 'Categoria', flex: 0.5 },
        { field: 'balance', headerName: 'Balance', flex: 0.5 },
        { field: 'in_delivery', headerName: 'Reparto', flex: 0.5 },
        {
        field: 'details',
        headerName: 'Details',
        flex: 0.5,
        renderCell: (params) => (
            <Button onClick={() => handleDetailsClick(params.row)}>
            Details
            </Button>
        ),
        },
    ]

    return (
            <SceneContainer>
                <Header title="CLIENTES" subtitle="Lista de clientes" />
                <Box
                    mt={'30px'}
                    height={'80vh'}
                >
                  <GeneralDatGrid<IClient> 
                    rows={clients}
                    columns={columns}
                  />
                </Box>
            </SceneContainer>
    )
}

export { Clients }