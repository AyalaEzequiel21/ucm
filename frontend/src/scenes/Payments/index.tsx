import { CustomDatGrid } from "@/components/CustomDataGrid"
import { Header } from "@/components/Header"
import { NotFoundComponent } from "@/components/ui-components/NotFoundComponent"
import { SceneContainer } from "@/components/SceneContainer"
import { SpinnerLoading } from "@/components/ui-components/SpinnerLoading"
import { RootState } from "@/redux/store"
import { getFormatedDate } from "@/utils/functionsHelper/getFormatedDate"
import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue"
import { renderButtonPrincipal } from "@/utils/functionsHelper/renderButtonPrincipal"
import { IClientPayment } from "@/utils/interfaces/IClientPayment"
import { GridColDef } from "@mui/x-data-grid"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { PaymentAddForm } from "@/components/forms/PaymentAddForm"
import { HeaderButton } from "@/components/ui-components/buttons/HeaderButton"

type PaymentsProps = object

/**
 * Componente `Payments`:
 * Este componente muestra una lista de pagos en un formato de tabla con columnas adaptativas según el dispositivo (base, tablet, desktop).
 * También incluye un encabezado con el título y subtítulo de la vista.
 */
const Payments: React.FC<PaymentsProps> = () => {

  // Obtiene la lista de pagos y el estado de carga desde el store de Redux.
    const {clientsPayments, clientsPaymentsLoading} = useSelector((state: RootState) => state.clientPayment.allClientsPayments)
      const navigate = useNavigate()
      const userLogin = useSelector((state: RootState) => state.user.userLogin)
    const isDelivery = userLogin?.role === 'delivery'
      const handleDetailsClick = (id: string) => {
        navigate(`/clientPayments/payment/${id}`)
        }

      const columnsBase: GridColDef<IClientPayment>[] = [
        { field: 'client_name', headerName: 'Cliente', flex: 0.75, renderCell(value){ return renderButtonPrincipal(value.row._id||'', value.row.client_name, ()=> handleDetailsClick(value.row._id ? value.row._id : '')) }},
        { field: 'amount', headerName: 'Total', flex: 0.5, renderCell(value){return getFormatedValue(value.row.amount)}},
      ]
    
      const columnsTablet: GridColDef<IClientPayment>[] = [
          { field: 'payment_method', headerName: 'Metodo', flex: 0.5 },
          { field: 'createdAt', headerName: 'Fecha', flex: 0.5, renderCell(value){return getFormatedDate(value.row.createdAt||'')}},
      ] 
      const columnsDesktop: GridColDef<IClientPayment>[] = [
        //   { field: 'createdAt', headerName: 'Registro', flex: 0.5 },
      ] 

      if(clientsPaymentsLoading || !clientsPayments) return <SpinnerLoading />

    return(
        <SceneContainer>
            <Header title="PAGOS DE CLIENTES" subtitle="Lista de pagos">
              <HeaderButton 
                form={<PaymentAddForm/>}
                model="Pago"
                type="add"
                disabled={isDelivery}
              />
            </Header>
            {clientsPayments.length === 0 ?
              <NotFoundComponent />
              :
              <CustomDatGrid<IClientPayment>
                  rows={clientsPayments || []}
                  isFilterName={true}
                  fieldValue="fullname"
                  columnsBase={columnsBase}
                  isLoading={clientsPaymentsLoading || !clientsPayments}
                  addedColumnsTable={columnsTablet}
                  addedColumnsDesktop={columnsDesktop}
              />
            }
        </SceneContainer>
    )
}

export { Payments }