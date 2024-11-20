import { CustomDatGrid } from "@/components/CustomDataGrid"
import { Header } from "@/components/Header"
import { NotAuthorizedComponent } from "@/components/ui-components/NotAuthorizedComponent"
import { NotFoundComponent } from "@/components/ui-components/NotFoundComponent"
import { SceneContainer } from "@/components/SceneContainer"
import { SpinnerLoading } from "@/components/ui-components/SpinnerLoading"
import { RootState } from "@/redux/store"
import { getFormatedDate } from "@/utils/functionsHelper/getFormatedDate"
import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue"
import { renderButtonPrincipal } from "@/utils/functionsHelper/renderButtonPrincipal"
import { IPaymentToSupplier } from "@/utils/interfaces/IPaymentToSupplier"
import { GridColDef } from "@mui/x-data-grid"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AddButton } from "@/components/ui-components/buttons/AddButton"
import { PaymentToSupplierAddForm } from "@/components/forms/PaymentToSupplierAddForm"


type PaymentsToSuppliersProps = object

/**
 * Componente `PaymentsToSuppliers`:
 * Este componente muestra una lista de pagos a proveedores en un formato de tabla con columnas adaptativas según el dispositivo (base, tablet, desktop).
 * También incluye un encabezado con el título y subtítulo de la vista.
 */
const PaymentsToSuppliers: React.FC<PaymentsToSuppliersProps> = () => {

    // Obtiene la lista de pagos a proveedor y el estado de carga desde el store de Redux.
    const {paymentsToSupplier, paymentsToSupplierLoading} = useSelector((state: RootState) => state.paymentToSupplier.allPaymentsToSupplier)
    const userLogin = useSelector((state: RootState) => state.user.userLogin)
    const isDelivery = userLogin?.role === 'delivery'
    const navigate = useNavigate()
    const handleDetailsClick = (id: string) => {
        navigate(`/paymentsToSuppliers/payment/${id}`)
    }

    const columnsBase: GridColDef<IPaymentToSupplier>[] = [
        { field: 'supplier_name', headerName: 'Proveedor', flex: 0.75, renderCell(value){ return renderButtonPrincipal(value.row._id, value.row.supplier_name, ()=> handleDetailsClick(value.row._id)) }},
        { field: 'total_payment', headerName: 'Total', flex: 0.5, renderCell(value){return getFormatedValue(value.row.total_payment)}},
    ]

    const columnsTablet: GridColDef<IPaymentToSupplier>[] = [
        { field: 'payment_method', headerName: 'Metodo', flex: 0.5 },
        { field: 'createdAt', headerName: 'Fecha', flex: 0.5, renderCell(value){return getFormatedDate(value.row.createdAt)} },
    ] 
    const columnsDesktop: GridColDef<IPaymentToSupplier>[] = [
        //   { field: 'createdAt', headerName: 'Registro', flex: 0.5 },
    ]

    if(paymentsToSupplierLoading || !paymentsToSupplier) return <SpinnerLoading />

    return(
        <SceneContainer>
            <Header title="PAGOS A PROVEEDORES" subtitle="Lista de pagos" >
                {!isDelivery && <AddButton
                    form={<PaymentToSupplierAddForm />}
                    model="Pago a proveedor"
                    disabled={isDelivery}
                />}
            </Header>
            {userLogin?.role === 'delivery' ?
                <NotAuthorizedComponent />
                :
                paymentsToSupplier.length === 0 ?
                    <NotFoundComponent />
                    :
                    <CustomDatGrid<IPaymentToSupplier>
                        rows={paymentsToSupplier || []}
                        isFilterName={true}
                        fieldValue="supplier_name"
                        columnsBase={columnsBase}
                        isLoading={paymentsToSupplierLoading || !paymentsToSupplier}
                        addedColumnsTable={columnsTablet}
                        addedColumnsDesktop={columnsDesktop}
                    />
            }
        </SceneContainer>
    )
}

export { PaymentsToSuppliers }