import { Box, useTheme } from "@mui/material"
import { NavBar } from "../../components/NavBar"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import useScreenSize from "@/hooks/useScreenSize"
import { Sidebar } from "@/components/Sidebar"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { useDispatch } from "react-redux"
import { jwtDecode } from "jwt-decode"
import { login, setUsers } from "@/redux/state/userState"
import { IUser } from "@/utils/interfaces/IUser"
import { useGetAllUsersQuery } from "@/redux/api/userApi"
import { useGetAllClientsQuery } from "@/redux/api/clientApi"
import { setClients } from "@/redux/state/clientState"


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
    const { data: users } = useGetAllUsersQuery()
    const { data: clients } = useGetAllClientsQuery()


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
            dispatch(setUsers(users.data))
        }
        if(clients){
            dispatch(setClients(clients.data))
        }
    }, [users, clients, dispatch])
    
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