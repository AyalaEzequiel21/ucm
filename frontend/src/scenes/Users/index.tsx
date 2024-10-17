import { CustomDatGrid } from "@/components/CustomDataGrid"
import { Header } from "@/components/Header"
import { NotAuthorizedComponent } from "@/components/NotAuthorizedComponent"
import { NotFoundComponent } from "@/components/NotFoundComponent"
import { SceneContainer } from "@/components/SceneContainer"
import { SpinnerLoading } from "@/components/SpinnerLoading"
import { RootState } from "@/redux/store"
import { getFormatedDate } from "@/utils/functionsHelper/getFormatedDate"
import { renderButtonPrincipal } from "@/utils/functionsHelper/renderButtonPrincipal"
import { UserType } from "@/utils/types/UserType"
import { GridColDef } from "@mui/x-data-grid"
import { useSelector } from "react-redux"


type UsersProps = object

/**
 * Componente `Users`:
 * Este componente muestra una lista de usuarios en un formato de tabla con columnas adaptativas según el dispositivo (base, tablet, desktop).
 * También incluye un encabezado con el título y subtítulo de la vista.
 */
const Users: React.FC<UsersProps> = () => {

    // Obtiene la lista de usuarios y el estado de carga desde el store de Redux.
    const {users, usersLoading} = useSelector((state: RootState) => state.user.allUsers)
    const userLogin = useSelector((state: RootState) => state.user.userLogin)
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

    if(usersLoading || !users) return <SpinnerLoading />
    
    return(
        <SceneContainer>
            <Header title="USUARIOS" subtitle="Lista de usuarios" type="basic"/>
            {userLogin?.role !== 'admin' ? 
                <NotAuthorizedComponent />
                :
                users.length === 0 ?
                <NotFoundComponent />
                :
                <CustomDatGrid<UserType>
                    rows={users || []}
                    isFilterName={true}
                    fieldValue="fullname"
                    columnsBase={columnsBase}
                    isLoading={usersLoading || !users}
                    addedColumnsTable={columnsTablet}
                    addedColumnsDesktop={columnsDesktop}
                />
            }
        </SceneContainer>
    )
}

export { Users }