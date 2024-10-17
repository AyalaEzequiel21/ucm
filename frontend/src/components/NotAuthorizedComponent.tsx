import { Box, Typography, useTheme } from "@mui/material"
import DoNotTouchIcon from '@mui/icons-material/DoNotTouch';

type NotAuthorizedProps = object

const NotAuthorizedComponent: React.FC<NotAuthorizedProps> = () => {
    const {palette} = useTheme()

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width={'100%'} 
            height={'100%'} 
            paddingTop={'4rem'}   
            gap={2}     
        >
            <DoNotTouchIcon sx={{fontSize: '2.6rem', color: palette.primary.dark}}/>
            <Typography variant="h1">Usuario no autorizado</Typography>
        </Box>
    )
}

export {NotAuthorizedComponent}