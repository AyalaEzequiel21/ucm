import { Box } from "@mui/material"
import { NavBar } from "../navbar"
import { Outlet } from "react-router-dom"

type LayoutProps = object

const Layout: React.FC<LayoutProps> = () => {
    
    return (
        <Box width={'100%'} height={'100%'} p={'0'}>
            <NavBar />
            Listo
            <Outlet />
        </Box>
    )
}

export { Layout }