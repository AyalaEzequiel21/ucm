import GroupsIcon from '@mui/icons-material/Groups'
import ReceiptIcon from '@mui/icons-material/Receipt'
import ListIcon from '@mui/icons-material/List'
import PaidIcon from '@mui/icons-material/Paid'
import ListAltIcon from '@mui/icons-material/ListAlt'
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'

export interface MenuItem {
    label: string;
    icon: React.ReactElement;
    pathKey: string;
  }  

export const ListMenuOptions = [
    {
        label: "Clientes",
        icon: <GroupsIcon />,
        pathKey: "clients"
    },
    {
        label: "Ventas",
        icon: <ReceiptIcon/>,
        pathKey: "sales"
    },
    {
        label: "Productos",
        icon: <ListIcon/>,
        pathKey: "products"
    },
    {
        label: "Pagos",
        icon: <PaidIcon/>,
        pathKey: "payments"
    },
    {
        label: "Reportes",
        icon: <ListAltIcon/>,
        pathKey: "reports"
    },
    {
        label: "Usuarios",
        icon: <SupervisedUserCircleIcon/>,
        pathKey: "users"
    },
    {
        label: "Proveedores",
        icon: <LocalShippingIcon/>,
        pathKey: "suppliers"
    },
    {
        label: "Pagos Proveedor",
        icon: <AccountBalanceWalletIcon/>,
        pathKey: "paymentsToSupplier"
    },
    {
        label: "Compras",
        icon: <ShoppingCartIcon/>,
        pathKey: "purchases"
    }
]