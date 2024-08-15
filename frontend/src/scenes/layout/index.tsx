import { Box, useTheme } from "@mui/material"
import { NavBar } from "../../components/NavBar"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import useScreenSize from "@/hooks/useScreenSize"
import { Sidebar } from "@/components/Sidebar"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { useDispatch } from "react-redux"
import { jwtDecode } from "jwt-decode"
import { login, setAllUsers } from "@/redux/state/userState"
import { IUser } from "@/utils/interfaces/IUser"
import { useGetAllUsersQuery } from "@/redux/api/userApi"
import { useGetAllClientsQuery } from "@/redux/api/clientApi"
import { setClients } from "@/redux/state/clientState"
import { useGetAllProductsQuery } from "@/redux/api/productApi"
import { setProducts } from "@/redux/state/productState"
import { useGetAllSuppliersQuery } from "@/redux/api/supplierApi"
import { setSuppliers } from "@/redux/state/supplierState"
import { useGetAllClientPaymentsQuery } from "@/redux/api/clientPaymentApi"
import { setClientsPayments } from "@/redux/state/clientsPaymentsState"
import { useGetAllPurchasesQuery } from "@/redux/api/purchaseApi"
import { setPurchases } from "@/redux/state/purchaseState"
import { useGetAllSalesQuery } from "@/redux/api/saleApi"
import { setSales } from "@/redux/state/saleState"
import { useGetAllPaymentsToSuppliersQuery } from "@/redux/api/paymentToSupplierApi"
import { setPaymentsToSupplier } from "@/redux/state/paymentToSupplierState"
import { useGetAllPaymentsReportsQuery } from "@/redux/api/paymentsReportApi"
import { setPaymentsReports } from "@/redux/state/paymentsReportState"

type LayoutProps = object

/**
 * Componente Layout:
 * Este componente organiza y estructura la interfaz principal de la aplicación, 
 * proporcionando un diseño consistente para todas las vistas. 
 * Incluye una barra lateral (sidebar) para la navegación, 
 * un encabezado (navbar) que muestra información del usuario, y un área principal donde se renderizan las vistas 
 * según la ruta actual. El componente también maneja la autenticación del usuario, 
 * verificando la existencia de un token JWT en el local storage, y carga datos relevantes de la aplicación 
 * a través de consultas API, sincronizándolos con el store de Redux.
 */

const Layout: React.FC<LayoutProps> = () => {
    const { isMobile } = useScreenSize()
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [dataUser, setDataUser] = useState<{username: string, role:string}> ({username: '', role: ''})
    const {palette} = useTheme()
    const {getJwtLocalStorage} = useLocalStorage()
    const jwt = getJwtLocalStorage()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { data: users, isLoading: usersLoading } = useGetAllUsersQuery()
    const { data: clients, isLoading: clientsLoading } = useGetAllClientsQuery()
    const { data: products, isLoading: productsLoading } = useGetAllProductsQuery()
    const { data: suppliers, isLoading: suppliersLoading } = useGetAllSuppliersQuery()
    const { data: clientsPayments, isLoading: clientsPaymentsLoading } = useGetAllClientPaymentsQuery()
    const { data: purchases, isLoading: purchasesLoading } = useGetAllPurchasesQuery()
    const { data: sales, isLoading: salesLoading } = useGetAllSalesQuery()
    const { data: paymentsToSuppliers, isLoading: paymentToSuppliersLoading } = useGetAllPaymentsToSuppliersQuery()
    const { data: paymentsReports, isLoading: paymentsReportsLoading } = useGetAllPaymentsReportsQuery()

    /**
     * useEffect para manejar la autenticación del usuario:
     * - Si no hay un JWT en el local storage, redirige al usuario a la página de login.
     * - Si hay un JWT, decodifica el token para obtener los datos del usuario y despacha una acción para iniciar sesión.
     * - También se actualizan los datos del usuario en el estado local.
     */
    useEffect(()=> {
        if(jwt === null){
            navigate('/login')
        } else {
            const jwtDecoded: IUser = jwtDecode(jwt)
            dispatch(login(jwtDecoded))            
            jwtDecoded && setDataUser({username: jwtDecoded?.username.toString(), role: jwtDecoded.role.toString()})
        }
    }, [jwt, dispatch, navigate])

    /**
     * useEffect para despachar los datos obtenidos desde la API al store de Redux:
     * - Despacha la acción correspondiente para actualizar el estado en Redux con los datos de cada entidad (usuarios, clientes, productos, etc.).
     * - Cada entidad se maneja de forma independiente para evitar que las actualizaciones de una afecten a las demás.
     */
    useEffect(()=> {
        if(users){
            dispatch(setAllUsers({users:users.data, usersLoading: usersLoading}))
        }
        if(clients){
            dispatch(setClients({clients: clients.data, clientsLoading: clientsLoading}))
        }
        if(products){
            dispatch(setProducts({products: products.data, productsLoading: productsLoading}))
        }
        if(suppliers){
            dispatch(setSuppliers({suppliers: suppliers.data, suppliersLoading: suppliersLoading}))
        }
        if(clientsPayments){
            dispatch(setClientsPayments({clientsPayments: clientsPayments.data, clientsPaymentsLoading: clientsPaymentsLoading}))
        }
        if(purchases){
            dispatch(setPurchases({purchases: purchases.data, purchaseLoading: purchasesLoading}))
        }
        if(sales){
            dispatch(setSales({sales: sales.data, saleLoading: salesLoading}))
        }
        if(paymentsToSuppliers){
            dispatch(setPaymentsToSupplier({paymentsToSupplier: paymentsToSuppliers.data, paymentsToSupplierLoading: paymentToSuppliersLoading}))
        }
        if(paymentsReports){
            dispatch(setPaymentsReports({paymentsReports: paymentsReports.data, paymentsReportsLoading: paymentsReportsLoading}))
        }
    }, [
        users, 
        clients, 
        clientsPayments, 
        products, 
        purchases,
        suppliers, 
        paymentsToSuppliers,
        sales,
        paymentsReports,
        dispatch, 
        usersLoading, 
        clientsLoading, 
        clientsPaymentsLoading,
        productsLoading, 
        purchasesLoading,
        suppliersLoading,
        paymentToSuppliersLoading,
        salesLoading,
        paymentsReportsLoading
    ])
    
    return (
        <Box width={'100%'} height={'auto'} p={'0'} display={isMobile? 'block' : 'flex'}>
            <Sidebar
                isSidebarOpen={isSidebarOpen} 
                setIsSidebarOpen={setIsSidebarOpen}
                isMobile={isMobile}
                drawerWidthPx={200}
            />  
            <Box flexGrow={1} bgcolor={palette.background.paper} minHeight={'100vh'}>
                <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} role={dataUser.role} username={dataUser.username}/>
                <Outlet />
            </Box>
        </Box>
    )
}

export { Layout }