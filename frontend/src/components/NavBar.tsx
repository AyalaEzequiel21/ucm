import { FlexBetween } from '@/components/FlexBetween'
import { AppBar, Toolbar, Typography, useTheme, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useSelector } from 'react-redux'
import { IUserState } from '@/redux/state/userState'
import { UserAvatar } from '@/components/UserAvatar'
import LogoutIcon from '@mui/icons-material/Logout'

type NavBarProps = {
    isSidebarOpen: boolean,
    setIsSidebarOpen: (isActive: boolean)=> void
}

const NavBar: React.FC<NavBarProps> = ({isSidebarOpen, setIsSidebarOpen}) => {
    const { palette } = useTheme()
    const userState = useSelector((store: { user: IUserState }) => store.user)

    const handleClickMenu = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

  return (
    <AppBar
        sx={{
            position: 'static',
            justifyContent: 'center',
            bgcolor: palette.primary.dark,
            height: '4rem',
            boxShadow: 'none'
            }}
    >
        <Toolbar>
            <FlexBetween width={'100%'} color={palette.grey[100]}>
                <FlexBetween gap={'1rem'}>
                    <IconButton sx={{color: palette.grey[100], background: 'none', '&:hover': {
                        color: palette.secondary.main
                    }}} onClick={handleClickMenu}>
                        <MenuIcon fontSize='large'/>
                    </IconButton>
                    <Typography variant='h3'>Managment</Typography>
                </FlexBetween>
                <FlexBetween gap={'1rem'}>
                    <UserAvatar user={userState.user}/>
                    <IconButton sx={{color: palette.grey[100], '&:hover': {
                        cursor: 'pointer',
                        color: palette.secondary.main
                    }}}>
                        <LogoutIcon fontSize='large'/>
                    </IconButton>
                </FlexBetween>
            </FlexBetween>
        </Toolbar>
    </AppBar>
  )
}

export { NavBar }