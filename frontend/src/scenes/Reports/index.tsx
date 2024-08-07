import { CustomDatGrid } from "@/components/CustomDataGrid"
import { Header } from "@/components/Header"
import { SceneContainer } from "@/components/SceneContainer"
import { RootState } from "@/redux/store"
import { getCapitalizeString } from "@/utils/functionsHelper/getCapitalizeString"
import { getFormatedDate } from "@/utils/functionsHelper/getFormatedDate"
import { renderButtonPrincipal } from "@/utils/functionsHelper/renderButtonPrincipal"
import { IPaymentsReport } from "@/utils/interfaces/IPaymentsReport"
import { GridColDef } from "@mui/x-data-grid"
import { useSelector } from "react-redux"

type PaymentsReportsProps = object

const PaymentsReports: React.FC<PaymentsReportsProps> = () => {

    const {paymentsReports, paymentsReportsLoading} = useSelector((state: RootState) => state.paymentsReport.allPaymentsReports)
    const handleDetailsClick = () => {
        console.log('_id');
    }

    const columnsBase: GridColDef<IPaymentsReport>[] = [
        { field: 'createdAt', headerName: 'Fecha', flex: 0.5, renderCell(value){return renderButtonPrincipal(value.row._id, getFormatedDate(value.row.createdAt), handleDetailsClick)}},
        { field: 'report_status', headerName: 'Estado', flex: 0.5, renderCell(value){return getCapitalizeString(value.row.report_status)} },

    ]

    const columnsTablet: GridColDef<IPaymentsReport>[] = [
    ]

    const columnsDesktop: GridColDef<IPaymentsReport>[] = [
    ]

    return(
        <SceneContainer>
            <Header title="REPORTES DE PAGOS" subtitle="Lista de reportes de pagos" />
            <CustomDatGrid<IPaymentsReport>
                rows={paymentsReports || []}
                isFilterName={false}
                columnsBase={columnsBase}
                isLoading={paymentsReportsLoading || !paymentsReports}
                addedColumnsTable={columnsTablet}
                addedColumnsDesktop={columnsDesktop}
            />
        </SceneContainer>
    )
}

export { PaymentsReports }