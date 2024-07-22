import { CustomDatGrid } from "@/components/CustomDataGrid"
import { Header } from "@/components/Header"
import { SceneContainer } from "@/components/SceneContainer"
import { RootState } from "@/redux/store"
import { getFormatedDate } from "@/utils/functionsHelper/getFormatedDate"
import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue"
import { renderButtonPrincipal } from "@/utils/functionsHelper/renderButtonPrincipal"
import { IPaymentToSupplier } from "@/utils/interfaces/IPaymentToSupplier"
import { GridColDef } from "@mui/x-data-grid"
import { useSelector } from "react-redux"


type PaymentsToSuppliersProps = object

const PaymentsToSuppliers: React.FC<PaymentsToSuppliersProps> = () => {

    const {paymentsToSupplier, paymentsToSupplierLoading} = useSelector((state: RootState) => state.paymentToSupplier.allPaymentsToSupplier)

    const handleDetailsClick = () => {
        console.log('_id');
    }

    const columnsBase: GridColDef<IPaymentToSupplier>[] = [
        { field: 'supplier_name', headerName: 'Proveedor', flex: 0.75, renderCell(value){ return renderButtonPrincipal(value.row._id, value.row.supplier_name, handleDetailsClick) }},
        { field: 'total_payment', headerName: 'Total', flex: 0.5, renderCell(value){return getFormatedValue(value.row.total_payment)}},
    ]

    const columnsTablet: GridColDef<IPaymentToSupplier>[] = [
        { field: 'payment_method', headerName: 'Metodo', flex: 0.5 },
        { field: 'createdAt', headerName: 'Fecha', flex: 0.5, renderCell(value){return getFormatedDate(value.row.createdAt)} },
    ] 
    const columnsDesktop: GridColDef<IPaymentToSupplier>[] = [
        //   { field: 'createdAt', headerName: 'Registro', flex: 0.5 },
    ]

    return(
        <SceneContainer>
            <Header title="PAGOS A PROVEEDORES" subtitle="Lista de pagos" />
            <CustomDatGrid<IPaymentToSupplier>
                rows={paymentsToSupplier || []}
                isFilterName={true}
                fieldValue="supplier_name"
                columnsBase={columnsBase}
                isLoading={paymentsToSupplierLoading || !paymentsToSupplier}
                addedColumnsTable={columnsTablet}
                addedColumnsDesktop={columnsDesktop}
            />
        </SceneContainer>
    )
}

export { PaymentsToSuppliers }