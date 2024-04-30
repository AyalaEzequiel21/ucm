import { Box, useTheme } from "@mui/material"
import { NavBar } from "../../components/NavBar"
import { Outlet } from "react-router-dom"
import { useState } from "react"
import useScreenSize from "@/hooks/useScreenSize"
import { Sidebar } from "@/components/Sidebar"

type LayoutProps = object

const Layout: React.FC<LayoutProps> = () => {
    const { isMobile } = useScreenSize()
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const {palette} = useTheme()
    
    return (
        <Box width={'100%'} height={'auto'} p={'0'} display={isMobile? 'block' : 'flex'}>
            <Sidebar
                isSidebarOpen={isSidebarOpen} 
                setIsSidebarOpen={setIsSidebarOpen}
                isMobile={isMobile}
                drawerwidthPx={200}
            />  
            <Box flexGrow={1} bgcolor={palette.background.paper} height={'100%'}>
                <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
                <Outlet />
            </Box>
        </Box>
    )
}

export { Layout }