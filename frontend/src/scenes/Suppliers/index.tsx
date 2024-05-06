import { CustomDatGrid } from "@/components/CustomDataGrid"
import { Header } from "@/components/Header"
import { SceneContainer } from "@/components/SceneContainer"
import { getSomeSuppliers } from "@/utils/dataUtils/dataMock"
import { ISupplier } from "@/utils/interfaces/ISupplier"
import { Box } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid"


type SuppliersProps = object

const Suppliers: React.FC<SuppliersProps> = () => {

    const suppliers = getSomeSuppliers()

    const columns: GridColDef[] = [
        { field: 'supplier_name', headerName: 'Proveedor', flex: 1 },
        { field: 'phone', headerName: 'Telefono', flex: 0.5 },
        { field: 'primeProduct', headerName: 'Producto', flex: 0.5 },
        { field: 'balance', headerName: 'Balance', flex: 0.5 },
        { field: 'createdAt', headerName: 'registro', flex: 0.5 },
    ]

    return(
        <SceneContainer>
            <Header title="PROVEEDORES" subtitle="Lista de proveedores" />
            <Box
                mt={'30px'}
                height={'80vh'}
            >
                <CustomDatGrid<ISupplier>
                    rows={suppliers}
                    columns={columns}
                    isFilterName= {true}
                    fieldValue="supplier_name"
                />
            </Box>
        </SceneContainer>
    )
}

export { Suppliers }