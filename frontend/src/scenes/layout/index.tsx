import { Box } from "@mui/material"
import { NavBar } from "../../components/NavBar"
import { Outlet } from "react-router-dom"
import { useState } from "react"
import useScreenSize from "@/hooks/useScreenSize"
import { Sidebar } from "@/components/Sidebar"

type LayoutProps = object

const Layout: React.FC<LayoutProps> = () => {
    const { isMobile } = useScreenSize()
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    
    return (
        <Box width={'100%'} height={'100%'} p={'0'} display={isMobile? 'block' : 'flex'}>
            <Sidebar
                isSidebarOpen={isSidebarOpen} 
                setIsSidebarOpen={setIsSidebarOpen}
                isMobile={isMobile}
            />  
            <Box flexGrow={1}>
                <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
                Listo
                <Outlet />
            </Box>
        </Box>
    )
}

export { Layout }