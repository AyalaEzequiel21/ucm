import { CustomDatGrid } from "@/components/CustomDataGrid"
import { Header } from "@/components/Header"
import { SceneContainer } from "@/components/SceneContainer"
import useScreenSize from "@/hooks/useScreenSize"
import { getSomeClients } from "@/utils/dataUtils/dataMock"
import { getFormatedDate } from "@/utils/functionsHelper/getFormatedDate"
import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue"
import { IClient } from "@/utils/interfaces/IClient"
import { Button } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid"


type ClientsProps = object

const Clients: React.FC<ClientsProps> = () => {

    const {isMobile} = useScreenSize()
    const clients = getSomeClients()

    const handleDetailsClick = (client: IClient) => {
        console.log(client)
    }

    const columns: GridColDef<IClient>[] = [
        { field: 'fullname', headerName: 'Cliente', flex: 1 },
        { field: 'category', headerName: 'Categoria', hideable: !isMobile, flex: 0.5, renderCell(value) {
          if(value.row.category === 'cat_1'){
            return 'Cargador'
          } else {
            return 'Carnicero'
          }
        }},
        { field: 'balance', headerName: 'Balance', flex: 0.5, renderCell(value) {
            return getFormatedValue(value.row.balance)
        }},
        { field: 'in_delivery', headerName: 'Reparto', hideable: !isMobile, flex: 0.5, renderCell(value) {
          if(value.row.in_delivery) {
            return 'Si'
          } else {
            return 'No'
          }
        }},
        { field: 'createdAt', headerName: 'Registro', hideable: !isMobile, flex: 0.5, renderCell(value){
          return getFormatedDate(value.row.createdAt)
        }},
        {
        field: 'details',
        headerName: 'Details',
        flex: 0.5,
        renderCell: (params) => (
            <Button key={params.row._id} onClick={() => handleDetailsClick(params.row)}>
            Details
            </Button>
        ),
        },
    ]

    return (
            <SceneContainer>
                <Header title="CLIENTES" subtitle="Lista de clientes" />
                <CustomDatGrid<IClient> 
                  rows={clients}
                  columns={columns}
                  isFilterName={true}
                  fieldValue="fullname"
                />
            </SceneContainer>
    )
}

export { Clients }