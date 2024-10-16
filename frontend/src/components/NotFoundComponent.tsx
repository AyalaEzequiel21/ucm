import { Box, Typography, useTheme } from "@mui/material"
import SearchOffIcon from '@mui/icons-material/SearchOff';

type NotFoundComponentProps = object

const NotFoundComponent: React.FC<NotFoundComponentProps> = () => {
    const {palette} = useTheme()
    return (
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} width={'100%'} height={'100%'} paddingTop={'4rem'}>
            <SearchOffIcon sx={{fontSize: '2.6rem', color: palette.primary.dark}}/>
            <Typography variant="h2" sx={{color: palette.primary.dark}}>No se encontraron resultados</Typography>
        </Box>
    )
}

export {NotFoundComponent}