import { CustomDatGrid } from "@/components/CustomDataGrid"
import { Header } from "@/components/Header"
import { NotAuthorizedComponent } from "@/components/ui-components/NotAuthorizedComponent"
import { NotFoundComponent } from "@/components/ui-components/NotFoundComponent"
import { SceneContainer } from "@/components/SceneContainer"
import { SpinnerLoading } from "@/components/ui-components/SpinnerLoading"
import { RootState } from "@/redux/store"
import { GridColDef } from "@mui/x-data-grid"
import { useSelector } from "react-redux"
import { HeaderButton } from "@/components/ui-components/buttons/HeaderButton"
import { DropDownMenu } from "@/components/ui-components/DropdownMenu"
import { UserAddForm } from "@/components/forms/add/UserAddForm"
import { UserModifyForm } from "@/components/forms/modify/UserModifyForm"
import { IUser } from "@/utils/interfaces/IUser"
import { useDeleteUserMutation } from "@/redux/api/userApi"
import { getCapitalizeString } from "@/utils/functionsHelper/getCapitalizeString"
import { useModalAlert } from "@/hooks/useModalAlert"
import { ActionConfirmComponent } from "@/components/ui-components/ActionConfirmComponent"

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
    const [deleteUser, {isLoading}] = useDeleteUserMutation()
    const isAdmin = userLogin?.role === 'admin'
    const { toggleErrorAlert, toggleSuccessAlert } = useModalAlert()

    const handleDelete = async (id: string) => {
        try{
            await deleteUser(id).unwrap()
            toggleSuccessAlert('Usuario eliminado exitosamente')
        } catch(error) {
            toggleErrorAlert('Error al eliminar el usuario')
            console.error(error)
        }
    }

    const columnsBase: GridColDef<IUser>[] = [
        { field: 'username', headerName: 'Usuario', flex: 1.1, renderCell(value){ return getCapitalizeString(value.row.username)}},
        { field: 'role', headerName: 'Role', flex: 0.7},
        { field: '', headerName: '...', flex: 0.3, renderCell(value){ return (
            <DropDownMenu formDelete={<ActionConfirmComponent model="Usuario" onConfirm={() => handleDelete(value.row._id)} isLoading={isLoading} type="delete"/>} formEdit={<UserModifyForm user={value.row}/>} model="Usuario" mode="dark"/>
            )
        }},
    ]
    
    const columnsTablet: GridColDef<IUser>[] = [
        //   { field: '_id', headerName: 'Id', flex: 0.5 },
        //   { field: 'createdAt', headerName: 'Registro', flex: 0.5, renderCell(value){return getFormatedDate(value.row.createdAt)} },

    ] 
    const columnsDesktop: GridColDef<IUser>[] = [] 

    if(usersLoading || !users) return <SpinnerLoading />
    
    return(
        <SceneContainer>
            <Header title="USUARIOS" subtitle="Lista de usuarios">
                {isAdmin && <HeaderButton
                    form={<UserAddForm/>}
                    type="add"
                    disabled={!isAdmin}
                />}
            </Header>
            {userLogin?.role !== 'admin' ? 
                <NotAuthorizedComponent />
                :
                users.length === 0 ?
                <NotFoundComponent />
                :
                <CustomDatGrid<IUser>
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