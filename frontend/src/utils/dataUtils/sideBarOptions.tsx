import GroupsIcon from '@mui/icons-material/Groups'
import ReceiptIcon from '@mui/icons-material/Receipt'
import ListIcon from '@mui/icons-material/List'
import PaidIcon from '@mui/icons-material/Paid'
import ListAltIcon from '@mui/icons-material/ListAlt'
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'

//  ESTRUCTURA DE UN ITEM DE NAVEGACION
export interface IMenuItem {
    label: string;
    icon: React.ReactElement;
    pathKey: string;
  }  

  // LISTA DE OPCIONE DEL MENU DE NAVEGACION
export const ListMenuOptions = [
    {
        label: "Clientes",
        icon: <GroupsIcon fontSize='large'/>,
        pathKey: "clients"
    },
    {
        label: "Productos",
        icon: <ListIcon fontSize='large'/>,
        pathKey: "products"
    },
    {
        label: "Ventas",
        icon: <ReceiptIcon fontSize='large'/>,
        pathKey: "sales"
    },
    {
        label: "Pagos",
        icon: <PaidIcon fontSize='large'/>,
        pathKey: "clientsPayments"
    },
    {
        label: "Reportes",
        icon: <ListAltIcon fontSize='large'/>,
        pathKey: "paymentsReport"
    },
    {
        label: "Proveedores",
        icon: <LocalShippingIcon fontSize='large'/>,
        pathKey: "suppliers"
    },
    {
        label: "Pagos Proveedor",
        icon: <AccountBalanceWalletIcon fontSize='large'/>,
        pathKey: "paymentsToSuppliers"
    },
    {
        label: "Compras",
        icon: <ShoppingCartIcon fontSize='large'/>,
        pathKey: "purchases"
    },
    {
        label: "Usuarios",
        icon: <SupervisedUserCircleIcon fontSize='large'/>,
        pathKey: "users"
    }
]