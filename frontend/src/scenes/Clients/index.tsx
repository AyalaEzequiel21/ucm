import { CustomDatGrid } from "@/components/CustomDataGrid";
import { Header } from "@/components/Header";
import { SceneContainer } from "@/components/SceneContainer";
import { useGetAllClientsQuery } from "@/redux/api/clientApi";
import { getFormatedDate } from "@/utils/functionsHelper/getFormatedDate";
import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue";
import { renderButtonPrincipal } from "@/utils/functionsHelper/renderButtonPrincipal";
import { IClient } from "@/utils/interfaces/IClient";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

type ClientsProps = object;

const Clients: React.FC<ClientsProps> = () => {

  const {data, isLoading} = useGetAllClientsQuery()
  const [clients, setClients] = useState<IClient[]>([]) 

  useEffect(()=> {
    if(data )
      setClients(data.data)
  }, [data])

  const handleDetailsClick = () => {
    console.log('_id');
  };

  const columnsBase: GridColDef<IClient>[] = [
    { field: 'fullname', headerName: 'Proveedor', flex: 0.75, renderCell(value){ return renderButtonPrincipal(value.row._id, value.row.fullname, handleDetailsClick) }},
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
  

  return (
    <SceneContainer>
      <Header title="CLIENTES" subtitle="Lista de clientes" />
      <CustomDatGrid<IClient>
        rows={clients || []}
        isFilterName={true}
        fieldValue="fullname"
        columnsBase={columnsBase}
        isLoading={isLoading || !data}
        addedColumnsTable={columnsTablet}
        addedColumnsDesktop={columnsDesktop}
      />
    </SceneContainer>
  );
};

export { Clients };
