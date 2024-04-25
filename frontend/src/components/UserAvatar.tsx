import { IUser } from "@/utils/interfaces/IUser"
import { Box, Typography, useTheme } from "@mui/material"
import { FlexBetween } from "./FlexBetween"
import useScreenSize from "@/hooks/useScreenSize"

type UserAvatarProps = {
    user: IUser|null,
}

const getFirstLetter = (username: string) => {
    const letter = username[0]
    return letter.toUpperCase()
}


const UserAvatar: React.FC<UserAvatarProps> = ({user}) => {
    const firstLetter = user? getFirstLetter(user.username) : ''
    const role = user? `${user?.role[0].toUpperCase()}${user?.role.slice(1)}` : ''
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
            {!isMobile && <Typography variant="h3">{role}</Typography>}
        </FlexBetween>
    )
}

export {UserAvatar}