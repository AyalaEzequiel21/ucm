import { Header } from "@/components/Header"
import { SceneContainer } from "@/components/SceneContainer"
import { getSomeClients } from "@/utils/dataUtils/dataMock"
import { IClient } from "@/utils/interfaces/IClient"
import { Box, Button, useTheme } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"


type ClientsProps = object

const Clients: React.FC<ClientsProps> = () => {

    const {palette} = useTheme()
    const clients = getSomeClients().clients

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
                    <DataGrid 
                        rows={clients}
                        getRowId={(row) => row._id}
                        columns={columns}
                        pageSizeOptions={[5, 10, 20]}
                        sx={{
                            maxWidth: '100%',
                            "& .MuiDataGrid-root": {
                                // border: "none",
                              },
                              "& .MuiDataGrid-cell": {
                                // borderBottom: "none",
                              },
                              "& .MuiDataGrid-columnHeader": {
                                color: palette.grey[100],
                                backgroundColor: palette.primary.dark,
                                // borderBottom: "none",
                              },
                              '& .MuiDataGrid-columnHeader .MuiButtonBase-root .MuiSvgIcon-root': {
                                fill: palette.grey[100],
                              },
                              "& .MuiDataGrid-virtualScroller": {
                                backgroundColor: palette.grey[100],
                              },
                              "& .MuiDataGrid-footerContainer": {
                                backgroundColor: palette.primary.dark,
                                color: palette.grey[100],
                                // borderTop: "none",
                              },
                              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                // color: `${palette.grey[100]} !important`,
                              },
                        }}
                    />
                </Box>
            </SceneContainer>
    )
}

export { Clients }