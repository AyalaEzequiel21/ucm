import { CustomDatGrid } from "@/components/CustomDataGrid"
import { Header } from "@/components/Header"
import { NotAuthorizedComponent } from "@/components/ui-components/NotAuthorizedComponent"
import { NotFoundComponent } from "@/components/ui-components/NotFoundComponent"
import { SceneContainer } from "@/components/SceneContainer"
import { SpinnerLoading } from "@/components/ui-components/SpinnerLoading"
import { RootState } from "@/redux/store"
import { getCapitalizeString } from "@/utils/functionsHelper/getCapitalizeString"
import { getFormatedDate } from "@/utils/functionsHelper/getFormatedDate"
import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue"
import { renderButtonPrincipal } from "@/utils/functionsHelper/renderButtonPrincipal"
import { ISupplier } from "@/utils/interfaces/ISupplier"
import { GridColDef } from "@mui/x-data-grid"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { SupplierAddForm } from "@/components/forms/add/SupplierAddForm"
import { HeaderButton } from "@/components/ui-components/buttons/HeaderButton"
import { useState } from "react"
import GroupIcon from '@mui/icons-material/Group'
import PersonOffIcon from '@mui/icons-material/PersonOff'
import { CustomButton } from "@/components/ui-components/buttons/CustomButton"

type SuppliersProps = object

/**
 * Componente `Suppliers`:
 * Este componente muestra una lista de proveedores en un formato de tabla con columnas adaptativas según el dispositivo (base, tablet, desktop).
 * También incluye un encabezado con el título y subtítulo de la vista.
 */
const Suppliers: React.FC<SuppliersProps> = () => {

    // Obtiene la lista de proveedores y el estado de carga desde el store de Redux.
    const {suppliers, inactiveSuppliers, suppliersLoading} = useSelector((state: RootState) => state.supplier.allSuppliers)
    const userLogin = useSelector((state: RootState) => state.user.userLogin)
    const isDelivery = userLogin?.role === 'delivery'
    const navigate = useNavigate()
      const [inactiveToggle, setInactiveToggle] = useState(false)
    
    const handleDetailsClick = (id: string) => {
        navigate(`/suppliers/supplier/${id}`)
    };

    const columnsBase: GridColDef<ISupplier>[] = [
        { field: 'supplier_name', headerName: 'Proveedor', flex: 0.75, renderCell(value){ return renderButtonPrincipal(value.row._id, value.row.supplier_name, ()=> handleDetailsClick(value.row._id)) }},
        { field: 'balance', headerName: 'Balance', flex: 0.5, renderCell(value){return getFormatedValue(value.row.balance)}},
    ]

    const columnsTablet: GridColDef<ISupplier>[] = [
        { field: 'phone', headerName: 'Telefono', flex: 0.5 },
        { field: 'primeProduct', headerName: 'Producto', flex: 0.5, renderCell(value){return getCapitalizeString(value.row.primeProduct)} },
    ] 
    const columnsDesktop: GridColDef<ISupplier>[] = [
        { field: 'createdAt', headerName: 'Registro', flex: 0.5, renderCell(value){return getFormatedDate(value.row.createdAt || '')} },
    ] 

    if(suppliersLoading || !suppliers) return <SpinnerLoading />

    return(
        <SceneContainer>
            <Header title="PROVEEDORES" subtitle="Lista de proveedores">
                {!isDelivery && <HeaderButton
                    form={<SupplierAddForm />}
                    type="add"
                    disabled={isDelivery}
                />}
                {!isDelivery && <CustomButton
                    label={inactiveToggle ? 'Activos' : 'Inactivos'}
                    icon={inactiveToggle ? <GroupIcon /> : <PersonOffIcon />}
                    onClick={()=>{setInactiveToggle(!inactiveToggle)}}
                    disabled={isDelivery || inactiveSuppliers.length === 0}
                    mode="light"
                    />
                }
            </Header>
            {userLogin?.role === 'delivery' ? 
                <NotAuthorizedComponent />
                :
                (suppliers.length === 0 && !inactiveToggle) 
                || 
                (inactiveSuppliers.length === 0 && inactiveToggle) ?
                    <NotFoundComponent />
                    : 
                    <CustomDatGrid<ISupplier>
                        rows={inactiveToggle ? inactiveSuppliers : suppliers || []}
                        isFilterName= {true}
                        fieldValue="supplier_name"
                        isLoading={suppliersLoading}
                        columnsBase={columnsBase}
                        addedColumnsTable={columnsTablet}
                        addedColumnsDesktop={columnsDesktop}
                    />
            }
        </SceneContainer>
    )
}

export { Suppliers }