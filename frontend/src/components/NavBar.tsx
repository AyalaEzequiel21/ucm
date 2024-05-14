import { FlexBetween } from '@/components/FlexBetween'
import { AppBar, Toolbar, Typography, useTheme, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useDispatch } from 'react-redux'
import { UserAvatar } from '@/components/UserAvatar'
import LogoutIcon from '@mui/icons-material/Logout'
import { logout } from '@/redux/state/userState'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useNavigate } from 'react-router-dom'

type NavBarProps = {
    isSidebarOpen: boolean,
    setIsSidebarOpen: (isActive: boolean)=> void,
    username: string,
    role: string
}

const NavBar: React.FC<NavBarProps> = ({isSidebarOpen, setIsSidebarOpen, username, role}) => {
    const { palette } = useTheme()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {logoutLocalUser} = useLocalStorage()
    const handleClickMenu = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    const handleLogout = () => {
        dispatch(logout());
        logoutLocalUser()
        navigate('/login')
    }

  return (
    <AppBar
        sx={{
            position: 'sticky',
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
                    {username && role && <UserAvatar username={username} role={role}/>}
                    <IconButton 
                        onClick={handleLogout}
                        sx={{
                            color: palette.grey[100], 
                            '&:hover': {
                            cursor: 'pointer',
                            color: palette.secondary.main
                        }}}
                    >
                        <LogoutIcon fontSize='large'/>
                    </IconButton>
                </FlexBetween>
            </FlexBetween>
        </Toolbar>
    </AppBar>
  )
}

export { NavBar }