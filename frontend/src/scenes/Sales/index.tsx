import { CustomDatGrid } from "@/components/CustomDataGrid"
import { Header } from "@/components/Header"
import { SceneContainer } from "@/components/SceneContainer"
import { RootState } from "@/redux/store"
import { getFormatedDate } from "@/utils/functionsHelper/getFormatedDate"
import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue"
import { renderButtonPrincipal } from "@/utils/functionsHelper/renderButtonPrincipal"
import { ISale } from "@/utils/interfaces/ISale"
import { GridColDef } from "@mui/x-data-grid"
import { useSelector } from "react-redux"


type SalesProps = object

/**
 * Componente `Sales`:
 * Este componente muestra una lista de ventas en un formato de tabla con columnas adaptativas según el dispositivo (base, tablet, desktop).
 * También incluye un encabezado con el título y subtítulo de la vista.
 */
const Sales: React.FC<SalesProps> = () => {

    // Obtiene la lista de ventas y el estado de carga desde el store de Redux.
    const {sales, saleLoading} = useSelector((state: RootState) => state.sale.allSales)

    const handleDetailsClick = () => {
        console.log('click');
    }

    const columnBase: GridColDef<ISale>[] = [
        { field: 'client_name', headerName: 'Cliente', flex: 0.75, renderCell(value){ return renderButtonPrincipal(value.row._id, value.row.client_name, handleDetailsClick) }},
        { field: 'total_sale', headerName: 'Total', flex: 0.5, renderCell(value){ return getFormatedValue(value.row.total_sale) } }
    ]

    const columnsTablet: GridColDef<ISale>[] = [
        { field: 'createdAt', headerName: 'Fecha', flex: 0.5, renderCell(value){return getFormatedDate(value.row.createdAt)}},
        { field: 'details', headerName: 'Productos', flex: 0.5, renderCell(value){return value.row.details.length}},
    ]

    const columnsDesktop: GridColDef<ISale>[] = [
        // { field: 'createdAt', headerName: 'Registro', flex: 0.5 },
    ]
    return(
        <SceneContainer>
            <Header title="VENTAS" subtitle="Lista de ventas" />
            <CustomDatGrid<ISale>
                rows={sales || []}
                isFilterName={true}
                fieldValue="client_name"
                isLoading={saleLoading || !sales}
                columnsBase={columnBase}
                addedColumnsTable={columnsTablet}
                addedColumnsDesktop={columnsDesktop}
            />
        </SceneContainer>
    )
}

export { Sales }