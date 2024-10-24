import { Box, Drawer, IconButton, List, useTheme } from "@mui/material"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import logo from "@/assets/logo.jpeg"
import { Close } from "@mui/icons-material"
import { IMenuItem, ListMenuOptions } from "@/utils/dataUtils/sideBarOptions"
import { ListItemSidebar } from "./ListItemSidebar"
import { useDispatch } from "react-redux"
import { ViewStateType, setViewState } from "@/redux/state/viewState"

/**
 * Componente Sidebar:
 * Muestra una barra lateral (sidebar) que puede ser abierta o cerrada.
 * La apariencia y el comportamiento del sidebar se ajustan en función de si el dispositivo es móvil o no.
 */
type SidebarProps = {
    isSidebarOpen: boolean, // Indica si el sidebar está abierto o cerrado.
    setIsSidebarOpen: (isActive: boolean) => void, // Función para actualizar el estado del sidebar.
    isMobile: boolean, // Indica si la vista actual es en un dispositivo móvil.
    drawerWidthPx: number // Ancho del sidebar en píxeles.
}

const Sidebar: React.FC<SidebarProps> = ({
    isSidebarOpen,
    setIsSidebarOpen,
    isMobile, 
    drawerWidthPx
}) => {

    const { pathname } = useLocation()
    const [active, setActive] = useState('')
    const navigate = useNavigate()
    const { palette } = useTheme()
    const widthCalulate = isMobile ? `${drawerWidthPx}px` : `${drawerWidthPx + 30}px`
    const dispatch = useDispatch()

    useEffect(()=> {
        setActive(pathname.substring(1))
    }, [pathname])

    const handleClickButtonSidebar = (pathKey: string, label: string) => {
        dispatch(setViewState(pathKey as ViewStateType))
        navigate(`/${pathKey}`)
        setActive(label)
        if (isMobile) {
            setIsSidebarOpen(!isSidebarOpen)
        }
    }

    const handleClickLogo = () => {
        dispatch(setViewState('home'))
        navigate('/home')
        setActive('')
    }

    return (
        <Box component={'nav'}>
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant="persistent"
                    anchor="left"
                    sx={{
                        width: widthCalulate,
                        "& .MuiDrawer-paper": {
                          color: palette.secondary.main,
                          backgroundColor: palette.primary.dark,
                          boxSixing: "border-box",
                          borderWidth: !isMobile ? 0 : "2px",
                          width: widthCalulate,
                        },
                      }}
                >
                    <Box width={'100%'}>
                        <Box  >
                            {isMobile && (
                                <Box display={'flex'} justifyContent={'flex-end'}>
                                    <IconButton onClick={()=> setIsSidebarOpen(!isSidebarOpen)} sx={{color: palette.grey[100]}}>
                                        <Close fontSize="medium"/>
                                    </IconButton>
                                </Box>
                            )}
                            <Box display="flex" alignItems="center" justifyContent={'center'} gap="0.5rem">
                                <Box 
                                    component={'img'}
                                    src={logo}
                                    alt="logo-image"
                                    onClick={handleClickLogo}
                                    sx={{
                                        height: isMobile? 130 : 160, 
                                        width: isMobile? 150 : 200,
                                        '&: hover': {
                                            cursor: 'pointer'
                                        }
                                    }}
                                />
                            </Box>                        
                      </Box>
                      <List>
                        {ListMenuOptions.map((menuItem: IMenuItem) => {
                            return (<ListItemSidebar  key={menuItem.pathKey} listItem={menuItem} handleClick={handleClickButtonSidebar} activeOption={active}/>)
                        })}
                      </List>
                    </Box>
                </Drawer>
            )}
        </Box>
    )
}

export { Sidebar }