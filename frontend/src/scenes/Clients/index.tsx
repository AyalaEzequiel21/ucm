import { CustomDatGrid } from "@/components/CustomDataGrid";
import { Header } from "@/components/Header";
import { NotFoundComponent } from "@/components/ui-components/NotFoundComponent";
import { SceneContainer } from "@/components/SceneContainer";
import { SpinnerLoading } from "@/components/ui-components/SpinnerLoading";
import { RootState } from "@/redux/store";
import { getFormatedDate } from "@/utils/functionsHelper/getFormatedDate";
import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue";
import { renderButtonPrincipal } from "@/utils/functionsHelper/renderButtonPrincipal";
import { IClient } from "@/utils/interfaces/IClient";
import { GridColDef } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddButton } from "@/components/ui-components/buttons/AddButton";
import { ClientAddForm } from "@/components/forms/ClientAddForm";

type ClientsProps = object;

/**
 * Componente `Clients`:
 * Este componente muestra una lista de clientes en un formato de tabla con columnas adaptativas según el dispositivo (base, tablet, desktop).
 * También incluye un encabezado con el título y subtítulo de la vista.
 */
const Clients: React.FC<ClientsProps> = () => {

    // Obtiene la lista de clientes y el estado de carga desde el store de Redux.
  const {clients, clientsLoading} = useSelector((state: RootState) => state.client.allClients)
  const navigate = useNavigate()
  const userLogin = useSelector((state: RootState) => state.user.userLogin)
  const isDelivery = userLogin?.role === 'delivery'
  const handleDetailsClick = (id: string) => {
    navigate(`/clients/client/${id}`)
  };

  const columnsBase: GridColDef<IClient>[] = [
    { field: 'fullname', headerName: 'Proveedor', flex: 0.75, renderCell(value){ return renderButtonPrincipal(value.row._id, value.row.fullname,()=> handleDetailsClick(value.row._id)) }},
    { field: 'balance', headerName: 'Balance', flex: 0.5, renderCell(value){return getFormatedValue(value.row.balance)}},
  ]

  const columnsTablet: GridColDef<IClient>[] = [
      { field: 'phone', headerName: 'Telefono', flex: 0.5 },
      { field: 'category', headerName: 'Categoria', flex: 0.5, renderCell(value){
          const category = value.row.category
          if(category === "cat_1")  return 'Cargador'
          else return 'Carnicero'
      } },
  ] 
  const columnsDesktop: GridColDef<IClient>[] = [
      { field: 'createdAt', headerName: 'Registro', flex: 0.5, renderCell(value){return getFormatedDate(value.row.createdAt)} },
  ] 
  
  if(clientsLoading || !clients) return <SpinnerLoading />

  return (
    <SceneContainer>
      <Header title="CLIENTES" subtitle="Lista de clientes">
        <AddButton 
          form={<ClientAddForm/>}
          model="Cliente"
          disabled={isDelivery}
        />
      </Header>
      {clients.length === 0 ?
        <NotFoundComponent /> 
        :
        <CustomDatGrid<IClient>
          rows={clients || []}
          isFilterName={true}
          fieldValue="fullname"
          columnsBase={columnsBase}
          isLoading={clientsLoading || !clients}
          addedColumnsTable={columnsTablet}
          addedColumnsDesktop={columnsDesktop}
        />
      }
    </SceneContainer>
  );
};

export { Clients };
