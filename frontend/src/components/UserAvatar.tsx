import { Box, Typography, useTheme } from "@mui/material"
import { FlexBetween } from "./FlexBetween"
import useScreenSize from "@/hooks/useScreenSize"

/**
 * 
 *  Componente UserAvatar renderiza un avatar para un usuario, mostrando la primera letra de su nombre 
 * y su rol. El avatar se muestra como un círculo con el fondo del color primario del tema. 
 * Si no es una vista móvil, también se muestra el rol del usuario al lado del avatar.
 * 
 * 
 */
type UserAvatarProps = {
    username: string, // El nombre de usuario del cual se extrae la primera letra para mostrar en el avatar.
    role: string // El rol del usuario, que se muestra al lado del avatar si no es una vista móvil.
}

const getFirstLetter = (username: string) => {
    const letter = username[0].toUpperCase()
    return letter
}

const UserAvatar: React.FC<UserAvatarProps> = ({username, role}) => {
    const firstLetter = getFirstLetter(username) 
    const roleUpper =  `${role[0].toUpperCase()}${role.slice(1)}`
    const {isMobile} = useScreenSize()
    const { palette } = useTheme()
    
    return (
        <FlexBetween gap={1}>
            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                sx={{
                    bgcolor: palette.primary.dark, 
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    border:`1px solid ${palette.secondary.main}`,
                    '&:hover': {
                        cursor: 'pointer',
                        color: palette.secondary.dark
                    }
                }}
            >
                <Typography variant="h1">{firstLetter}</Typography>
            </Box>
            {!isMobile && <Typography variant="h4">{roleUpper}</Typography>}
        </FlexBetween>
    )
}

export {UserAvatar}