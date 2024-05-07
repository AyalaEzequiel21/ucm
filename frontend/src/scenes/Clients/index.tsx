import { CustomDatGrid } from "@/components/CustomDataGrid";
import { Header } from "@/components/Header";
import { SceneContainer } from "@/components/SceneContainer";
import useScreenSize from "@/hooks/useScreenSize";
import { getSomeClients } from "@/utils/dataUtils/dataMock";
import { getFormatedDate } from "@/utils/functionsHelper/getFormatedDate";
import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue";
import { IClient } from "@/utils/interfaces/IClient";
import { Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

type ClientsProps = object;

const Clients: React.FC<ClientsProps> = () => {
  const { isMobile, isTablet } = useScreenSize();
  const clients = getSomeClients();

  const handleDetailsClick = (client: IClient) => {
    console.log(client);
  };

  const columnsPitcher = (isMobile: boolean, isTablet: boolean): GridColDef<IClient>[] => {
    if (isMobile) {
      return [
        { field: "fullname", headerName: "Cliente", flex: 1, renderCell(value){
          return (
            <Button
              key={value.row._id}
              onClick={() => handleDetailsClick(value.row)}
            >
              {value.row.fullname}
            </Button>
          )
        } },
        {
          field: "balance",
          headerName: "Balance",
          flex: 0.5,
          renderCell(value) {
            return getFormatedValue(value.row.balance);
          },
        },
      ];
    } if(isTablet) {
        return [
          { field: "fullname", headerName: "Cliente", flex: 0.5 },
          {
            field: "category",
            headerName: "Categoria",

            flex: 0.5,
            renderCell(value) {
              if (value.row.category === "cat_1") {
                return "Cargador";
              } else {
                return "Carnicero";
              }
            },
          },
          {
            field: "balance",
            headerName: "Balance",
            flex: 0.5,
            renderCell(value) {
              return getFormatedValue(value.row.balance);
            },
          },
          {
            field: "in_delivery",
            headerName: "Reparto",
            flex: 0.5,
            renderCell(value) {
              if (value.row.in_delivery) {
                return "Si";
              } else {
                return "No";
              }
            },
          },
          {
            field: "createdAt",
            headerName: "Registro",
            flex: 0.5,
            renderCell(value) {
              return getFormatedDate(value.row.createdAt);
            },
          },
          {
            field: "details",
            headerName: "Details",
            flex: 0.5,
            renderCell: (params) => (
              <Button
                key={params.row._id}
                onClick={() => handleDetailsClick(params.row)}
              >
                Details
              </Button>
            ),
          },
        ];
    } else {
      return [
        { field: "fullname", headerName: "Cliente", flex: 1 },
        {
          field: "category",
          headerName: "Categoria",
          flex: 0.5,
          renderCell(value) {
            if (value.row.category === "cat_1") {
              return "Cargador";
            } else {
              return "Carnicero";
            }
          },
        },
        {
          field: "balance",
          headerName: "Balance",
          flex: 0.5,
          renderCell(value) {
            return getFormatedValue(value.row.balance);
          },
        },
        {
          field: "in_delivery",
          headerName: "Reparto",
          flex: 0.5,
          renderCell(value) {
            if (value.row.in_delivery) {
              return "Si";
            } else {
              return "No";
            }
          },
        },
        {
          field: "createdAt",
          headerName: "Registro",
          flex: 0.5,
          renderCell(value) {
            return getFormatedDate(value.row.createdAt);
          },
        },
        {
          field: "details",
          headerName: "Details",
          flex: 0.5,
          renderCell: (params) => (
            <Button
              key={params.row._id}
              onClick={() => handleDetailsClick(params.row)}
            >
              Details
            </Button>
          ),
        },
      ];
    }
  };

  

  return (
    <SceneContainer>
      <Header title="CLIENTES" subtitle="Lista de clientes" />
      <CustomDatGrid<IClient>
        rows={clients}
        columns={columnsPitcher(isMobile, isTablet)}
        isFilterName={true}
        fieldValue="fullname"
      />
    </SceneContainer>
  );
};

export { Clients };
