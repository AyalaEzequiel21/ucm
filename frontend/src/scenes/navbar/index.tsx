import { FlexBetween } from '@/components/FlexBetween'
import { AppBar, Toolbar, Typography, useTheme, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import useScreenSize from '@/hooks/useScreenSize'
// import {useState} from 'react'

type NavBarProps = object

const NavBar: React.FC<NavBarProps> = () => {
    const {palette} = useTheme()
    const { isMobile } = useScreenSize()


  return (
    <AppBar
        sx={{
            position: 'static',
            justifyContent: 'center',
            bgcolor: palette.secondary.dark,
            height: '4rem',
            boxShadow: 'none'
            }}
    >
        <Toolbar>
            <FlexBetween width={'100%'} color={palette.grey[100]}>
                <FlexBetween>
                    {isMobile && <IconButton sx={{color: palette.grey[100]}}>
                        <MenuIcon fontSize='large'/>
                    </IconButton>}
                    <Typography variant='h3'>Managment</Typography>
                </FlexBetween>
                <FlexBetween>
                    <Typography variant='h3'>User</Typography>
                </FlexBetween>
            </FlexBetween>
        </Toolbar>
    </AppBar>
  )
}

export { NavBar }