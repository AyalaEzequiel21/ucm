import { CustomDatGrid } from "@/components/CustomDataGrid"
import { Header } from "@/components/Header"
import { SceneContainer } from "@/components/SceneContainer"
import { getSomeSuppliers } from "@/utils/dataUtils/dataMock"
import { getFormatedDate } from "@/utils/functionsHelper/getFormatedDate"
import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue"
import { renderButtonPrincipal } from "@/utils/functionsHelper/renderButtonPrincipal"
import { ISupplier } from "@/utils/interfaces/ISupplier"
import { GridColDef } from "@mui/x-data-grid"


type SuppliersProps = object

const Suppliers: React.FC<SuppliersProps> = () => {

    const suppliers = getSomeSuppliers()

    const columnsBase: GridColDef<ISupplier>[] = [
        { field: 'supplier_name', headerName: 'Proveedor', flex: 1, renderCell(value){ return renderButtonPrincipal(value.row._id, value.row.supplier_name, ()=> {console.log('hola')}) }},
        { field: 'balance', headerName: 'Balance', flex: 0.5, renderCell(value){return getFormatedValue(value.row.balance)}},
    ]

    const columnsTablet: GridColDef<ISupplier>[] = [
        { field: 'phone', headerName: 'Telefono', flex: 0.5 },
        { field: 'primeProduct', headerName: 'Producto', flex: 0.5 },
    ] 
    const columnsDesktop: GridColDef<ISupplier>[] = [
        { field: 'createdAt', headerName: 'Registro', flex: 0.5, renderCell(value){return getFormatedDate(value.row.createdAt)} },
    ] 

    return(
        <SceneContainer>
            <Header title="PROVEEDORES" subtitle="Lista de proveedores" />
            <CustomDatGrid<ISupplier>
                rows={suppliers}
                isFilterName= {true}
                fieldValue="supplier_name"
                columnsBase={columnsBase}
                addedColumnsTable={columnsTablet}
                addedColumnsDesktop={columnsDesktop}
            />
        </SceneContainer>
    )
}

export { Suppliers }