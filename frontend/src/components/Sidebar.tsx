import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from "@mui/material"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import logo from "@/assets/logo.jpeg"
import { ChevronRightOutlined, Close } from "@mui/icons-material"
import { IMenuItem, ListMenuOptions } from "@/utils/dataUtils/sideBarOptions"

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
                            if(!menuItem.icon){
                                return (
                                    <Typography key={menuItem.pathKey}>
                                        {menuItem.label}
                                    </Typography>
                                )
                            }

                            const lcLabel = menuItem.label.toLocaleLowerCase()

                            return (
                                <ListItem key={menuItem.pathKey} disablePadding>
                                    <ListItemButton
                                        onClick={() => {
                                            // navigate(`/${menuItem.pathKey}`)
                                            setActive(lcLabel)
                                        }}
                                        sx={{
                                            backgroundColor:
                                              active === lcLabel
                                                ? palette.secondary.main
                                                : "transparent",
                                            color:
                                              active === lcLabel
                                                ? palette.secondary.main
                                                : palette.grey[100],
                                                '&:hover': {
                                                    backgroundColor: palette.secondary.main
                                                }
                                          }}
                                    >
                                        <ListItemIcon
                                        sx={{
                                            color:
                                              active === lcLabel
                                                ? palette.primary.dark
                                                : palette.grey[100],
                                        }}
                                        >
                                            {menuItem.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={menuItem.label} sx={{
                                            fontWeight: 'bold',
                                            color: active === lcLabel
                                            ? palette.primary.dark
                                            : palette.grey[100],
                                        }}/>
                                        {active === lcLabel && (
                                            <ChevronRightOutlined sx={{ ml: "auto", color: palette.grey[100] }} />
                                        )}
                                    </ListItemButton>
                                </ListItem>
                            )
                        })}
                      </List>
                    </Box>
                </Drawer>
            )}
        </Box>
    )
}

export { Sidebar }