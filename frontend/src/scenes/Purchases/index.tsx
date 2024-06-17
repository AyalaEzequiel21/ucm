import { CustomDatGrid } from "@/components/CustomDataGrid"
import { Header } from "@/components/Header"
import { SceneContainer } from "@/components/SceneContainer"
import { RootState } from "@/redux/store"
import { getFormatedDate } from "@/utils/functionsHelper/getFormatedDate"
import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue"
import { renderButtonPrincipal } from "@/utils/functionsHelper/renderButtonPrincipal"
import { IPurchase } from "@/utils/interfaces/IPurchase"
import { GridColDef } from "@mui/x-data-grid"
import { useSelector } from "react-redux"


type PurchasesProps = object

const Purchases: React.FC<PurchasesProps> = () => {

    const {purchases, purchaseLoading} = useSelector((state: RootState) => state.purchase.allPurchases)

    const handleDetailsClick = () => {
        console.log('click');
    }

    const columnBase: GridColDef<IPurchase>[] = [
        { field: 'supplier_name', headerName: 'Proveedor', flex: 0.75, renderCell(value){ return renderButtonPrincipal(value.row._id, value.row.supplier_name, handleDetailsClick) }},
        { field: 'total_purchase', headerName: 'Total', flex: 0.5, renderCell(value){ return getFormatedValue(value.row.total_purchase) } }
    ]

    const columnsTablet: GridColDef<IPurchase>[] = [
        { field: 'createdAt', headerName: 'Fecha', flex: 0.5, renderCell(value){return getFormatedDate(value.row.createdAt)}},
    ] 
    const columnsDesktop: GridColDef<IPurchase>[] = [
      //   { field: 'createdAt', headerName: 'Registro', flex: 0.5 },
    ] 



    return(
        <SceneContainer>
            <Header title="COMPRAS A PROVEEDORES" subtitle="Lista de compras" />
            <CustomDatGrid<IPurchase>
                rows={purchases || []}
                isFilterName={true}
                fieldValue="supplier_name"
                isLoading={purchaseLoading || !purchases}
                columnsBase={columnBase}
                addedColumnsTable={columnsTablet}
                addedColumnsDesktop={columnsDesktop}
            />
        </SceneContainer>
    )
}

export { Purchases }