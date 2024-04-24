import { Box, Drawer, useTheme } from "@mui/material"

type SidebarProps = {
    isSidebarOpen: boolean,
    setIsSidebarOpen: (isActive: boolean)=> void,
    isMobile: boolean
}

const Sidebar: React.FC<SidebarProps> = ({
    isSidebarOpen,
    setIsSidebarOpen,
    isMobile
}) => {
    const {palette} = useTheme()

    return (
        <Box component={'nav'}>
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant="persistent"
                    anchor="left"
                    sx={{
                        width: '250px',
                        "& .MuiDrawer-paper": {
                          color: palette.secondary.main,
                          backgroundColor: palette.secondary.light,
                          boxSixing: "border-box",
                          borderWidth: !isMobile ? 0 : "2px",
                          width: '250px',
                        },
                      }}
                >

                </Drawer>
            )}
        </Box>
    )
}

export { Sidebar }