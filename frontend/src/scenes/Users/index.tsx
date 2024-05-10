import { CustomDatGrid } from "@/components/CustomDataGrid"
import { Header } from "@/components/Header"
import { SceneContainer } from "@/components/SceneContainer"
import { useGetAllUsersQuery } from "@/redux/api/userApi"
import { getFormatedDate } from "@/utils/functionsHelper/getFormatedDate"
import { renderButtonPrincipal } from "@/utils/functionsHelper/renderButtonPrincipal"
import { UserType } from "@/utils/types/UserType"
import { GridColDef } from "@mui/x-data-grid"


type UsersProps = object

const Users: React.FC<UsersProps> = () => {

    const {data, isLoading} = useGetAllUsersQuery()

    const handleDetailsClick = () => {
        console.log('_id');
    };

    const columnsBase: GridColDef<UserType>[] = [
        { field: 'username', headerName: 'Usuario', flex: 0.75, renderCell(value){ return renderButtonPrincipal(value.row._id, value.row.username, handleDetailsClick) }},
        { field: 'role', headerName: 'Role', flex: 0.5},
      ]
    
      const columnsTablet: GridColDef<UserType>[] = [
          { field: '_id', headerName: 'Id', flex: 0.5 },
          { field: 'createdAt', headerName: 'Registro', flex: 0.5, renderCell(value){return getFormatedDate(value.row.createdAt)} },

      ] 
      const columnsDesktop: GridColDef<UserType>[] = [] 

    return(
        <SceneContainer>
            <Header title="USUARIOS" subtitle="Lista de usuarios" />
            <CustomDatGrid<UserType>
                rows={data?.data || []}
                isFilterName={true}
                fieldValue="fullname"
                columnsBase={columnsBase}
                isLoading={isLoading || !data}
                addedColumnsTable={columnsTablet}
                addedColumnsDesktop={columnsDesktop}
            />
        </SceneContainer>
    )
}

export { Users }