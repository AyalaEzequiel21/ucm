import { Box, Typography, useTheme } from "@mui/material"
import { FlexBetween } from "./FlexBetween"
import useScreenSize from "@/hooks/useScreenSize"

type UserAvatarProps = {
    username: string,
    role: string
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