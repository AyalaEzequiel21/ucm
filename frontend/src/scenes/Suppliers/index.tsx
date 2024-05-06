import { CustomDatGrid } from "@/components/CustomDataGrid"
import { Header } from "@/components/Header"
import { SceneContainer } from "@/components/SceneContainer"
import useScreenSize from "@/hooks/useScreenSize"
import { getSomeSuppliers } from "@/utils/dataUtils/dataMock"
import { getFormatedDate } from "@/utils/functionsHelper/getFormatedDate"
import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue"
import { ISupplier } from "@/utils/interfaces/ISupplier"
import { GridColDef } from "@mui/x-data-grid"


type SuppliersProps = object

const Suppliers: React.FC<SuppliersProps> = () => {

    const {isMobile} = useScreenSize()
    const suppliers = getSomeSuppliers()

    const columns: GridColDef[] = [
        { field: 'supplier_name', headerName: 'Proveedor', flex: 1 },
        { field: 'phone', headerName: 'Telefono', hideable: isMobile, flex: 0.5 },
        { field: 'primeProduct', headerName: 'Producto', flex: 0.5 },
        { field: 'balance', headerName: 'Balance', flex: 0.5, renderCell(value) {
            return getFormatedValue(value.row.balance)
        }},
        { field: 'createdAt', headerName: 'Registro', flex: 0.5, renderCell(value){
            return getFormatedDate(value.row.createdAt)
          }},
    ]

    return(
        <SceneContainer>
            <Header title="PROVEEDORES" subtitle="Lista de proveedores" />
            <CustomDatGrid<ISupplier>
                rows={suppliers}
                columns={columns}
                isFilterName= {true}
                fieldValue="supplier_name"
            />
        </SceneContainer>
    )
}

export { Suppliers }