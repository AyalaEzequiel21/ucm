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
import { ClientAddForm } from "@/components/forms/add/ClientAddForm";
import { HeaderButton } from "@/components/ui-components/buttons/HeaderButton";
import { CustomButton } from "@/components/ui-components/buttons/CustomButton";
import { useState } from "react";
import GroupIcon from '@mui/icons-material/Group'
import PersonOffIcon from '@mui/icons-material/PersonOff'

type ClientsProps = object;

/**
 * Componente `Clients`:
 * Este componente muestra una lista de clientes en un formato de tabla con columnas adaptativas según el dispositivo (base, tablet, desktop).
 * También incluye un encabezado con el título y subtítulo de la vista.
 */
const Clients: React.FC<ClientsProps> = () => {

    // Obtiene la lista de clientes y el estado de carga desde el store de Redux.
  const {clients, inactiveClients, clientsLoading} = useSelector((state: RootState) => state.client.allClients)
  const navigate = useNavigate()
  const userLogin = useSelector((state: RootState) => state.user.userLogin)
  const [inactiveToggle, setInactiveToggle] = useState(false)
  const isDelivery = userLogin?.role === 'delivery'
  
  const handleDetailsClick = (id: string) => {
    navigate(`/clients/client/${id}`)
  };

  const columnsBase: GridColDef<IClient>[] = [
    { field: 'fullname', headerName: 'Proveedor', flex: 0.75, renderCell(value){ return renderButtonPrincipal(value.row._id, value.row.fullname,()=> handleDetailsClick(value.row._id)) }},
    { field: 'balance', headerName: 'Balance', flex: 0.5, renderCell(value){return getFormatedValue(value.row.balance)}},
  ]

  const columnsTablet: GridColDef<IClient>[] = [
    { field: 'category', headerName: 'Categoria', flex: 0.5, renderCell(value){
        const category = value.row.category
        if(category === "cat_1")  return 'Cargador'
        else return 'Carnicero'
      }
    },
  ] 
  const columnsDesktop: GridColDef<IClient>[] = [
    { field: 'phone', headerName: 'Telefono', flex: 0.5 },
    { field: 'createdAt', headerName: 'Registro', flex: 0.5, renderCell(value){return getFormatedDate(value.row.createdAt)} },
  ] 

  
  if(clientsLoading || !clients) return <SpinnerLoading />

  return (
    <SceneContainer>
      <Header title="CLIENTES" subtitle="Lista de clientes">
        <HeaderButton 
          form={<ClientAddForm/>}
          type="add"
          disabled={isDelivery}
        />
        <CustomButton
          label={inactiveToggle ? 'Activos' : 'Inactivos'}
          icon={inactiveToggle ? <GroupIcon /> : <PersonOffIcon />}
          onClick={()=>{setInactiveToggle(!inactiveToggle)}}
          disabled={inactiveClients.length === 0}
          mode="light"
        />
      </Header>
      { (clients.length === 0 && !inactiveToggle) 
        ||
        (inactiveClients.length === 0 && inactiveToggle) ?
        <NotFoundComponent /> 
        :
        <CustomDatGrid<IClient>
          rows={inactiveToggle? inactiveClients : clients || []}
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
