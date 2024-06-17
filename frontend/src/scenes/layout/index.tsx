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


type LayoutProps = object

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

    useEffect(()=> {
        if(jwt === null){
            navigate('/login')
        } else {
            const jwtDecoded: IUser = jwtDecode(jwt)
            dispatch(login(jwtDecoded))            
            jwtDecoded && setDataUser({username: jwtDecoded?.username.toString(), role: jwtDecoded.role.toString()})
        }
    }, [jwt, dispatch, navigate])

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
    }, [
        users, 
        clients, 
        clientsPayments, 
        products, 
        purchases,
        suppliers, 
        dispatch, 
        usersLoading, 
        clientsLoading, 
        clientsPaymentsLoading,
        productsLoading, 
        purchasesLoading,
        suppliersLoading
    ])
    
    return (
        <Box width={'100%'} height={'auto'} p={'0'} display={isMobile? 'block' : 'flex'}>
            <Sidebar
                isSidebarOpen={isSidebarOpen} 
                setIsSidebarOpen={setIsSidebarOpen}
                isMobile={isMobile}
                drawerwidthPx={200}
            />  
            <Box flexGrow={1} bgcolor={palette.background.paper} minHeight={'100vh'}>
                <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} role={dataUser.role} username={dataUser.username}/>
                <Outlet />
            </Box>
        </Box>
    )
}

export { Layout }