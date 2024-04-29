import { Box, Drawer, IconButton, List, useTheme } from "@mui/material"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import logo from "@/assets/logo.jpeg"
import { Close } from "@mui/icons-material"
import { IMenuItem, ListMenuOptions } from "@/utils/dataUtils/sideBarOptions"
import { ListItemSidebar } from "./ListItemSidebar"

type SidebarProps = {
    isSidebarOpen: boolean,
    setIsSidebarOpen: (isActive: boolean)=> void,
    isMobile: boolean,
    drawerwidthPx: number
}

const Sidebar: React.FC<SidebarProps> = ({
    isSidebarOpen,
    setIsSidebarOpen,
    isMobile, 
    drawerwidthPx
}) => {

    const { pathname } = useLocation()
    const [active, setActive] = useState('')
    // const navigate = useNavigate()
    const { palette } = useTheme()
    const widthCalulate = isMobile ? `${drawerwidthPx}px` : `${drawerwidthPx + 30}px`

    useEffect(()=> {
        setActive(pathname.substring(1))
    }, [pathname])

    const handleClickButtonSidebar = (pathKey: string, label: string) => {
        // navigate(`/${pathKey}`)
        setActive(label)
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
                                    sx={{
                                        height: isMobile? 130 : 160, 
                                        width: isMobile? 150 : 200,
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