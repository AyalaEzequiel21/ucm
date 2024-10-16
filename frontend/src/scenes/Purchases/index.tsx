import { CustomDatGrid } from "@/components/CustomDataGrid"
import { Header } from "@/components/Header"
import { NotFoundComponent } from "@/components/NotFoundComponent"
import { SceneContainer } from "@/components/SceneContainer"
import { SpinnerLoading } from "@/components/SpinnerLoading"
import { RootState } from "@/redux/store"
import { getFormatedDate } from "@/utils/functionsHelper/getFormatedDate"
import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue"
import { renderButtonPrincipal } from "@/utils/functionsHelper/renderButtonPrincipal"
import { IPurchase } from "@/utils/interfaces/IPurchase"
import { GridColDef } from "@mui/x-data-grid"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


type PurchasesProps = object

/**
 * Componente `Purchases`:
 * Este componente muestra una lista de compras en un formato de tabla con columnas adaptativas según el dispositivo (base, tablet, desktop).
 * También incluye un encabezado con el título y subtítulo de la vista.
 */
const Purchases: React.FC<PurchasesProps> = () => {

    // Obtiene la lista de compras y el estado de carga desde el store de Redux.
    const {purchases, purchaseLoading} = useSelector((state: RootState) => state.purchase.allPurchases)
    const navigate = useNavigate()

    const handleDetailsClick = (id: string) => {
        navigate(`/purchases/purchase/${id}`)
    }

    const columnBase: GridColDef<IPurchase>[] = [
        { field: 'supplier_name', headerName: 'Proveedor', flex: 0.75, renderCell(value){ return renderButtonPrincipal(value.row._id, value.row.supplier_name, ()=> handleDetailsClick(value.row._id)) }},
        { field: 'total_purchase', headerName: 'Total', flex: 0.5, renderCell(value){ return getFormatedValue(value.row.total_purchase) } }
    ]

    const columnsTablet: GridColDef<IPurchase>[] = [
        { field: 'createdAt', headerName: 'Fecha', flex: 0.5, renderCell(value){return getFormatedDate(value.row.createdAt)}},
    ] 
    const columnsDesktop: GridColDef<IPurchase>[] = [
      //   { field: 'createdAt', headerName: 'Registro', flex: 0.5 },
    ] 

    if(purchaseLoading || !purchases) return <SpinnerLoading />

    return(
        <SceneContainer>
            <Header title="COMPRAS A PROVEEDORES" subtitle="Lista de compras" type="basic"/>
                {purchases.length === 0 ?
                    <NotFoundComponent />
                    :
                    <CustomDatGrid<IPurchase>
                        rows={purchases || []}
                        isFilterName={true}
                        fieldValue="supplier_name"
                        isLoading={purchaseLoading || !purchases}
                        columnsBase={columnBase}
                        addedColumnsTable={columnsTablet}
                        addedColumnsDesktop={columnsDesktop}
                    />
                }
        </SceneContainer>
    )
}

export { Purchases }