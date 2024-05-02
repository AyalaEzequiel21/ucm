import { Box, Typography, useTheme } from "@mui/material"
import { FlexBetween } from "./FlexBetween"
import { ToolbarButton } from "./ToolbarButton"
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'


type HeaderProps = {
    title: string, 
    subtitle: string
}

const Header: React.FC<HeaderProps> = ({title, subtitle}) => {

    const {palette} = useTheme()
    
    return (
        <Box>
            <Typography
                color={palette.primary.dark}
                fontSize={'35px'}
                fontWeight={'bold'}

                sx={{ mb: '3px' }}
            >
                {title}
            </Typography>
            <FlexBetween>
            <Typography
                variant="h4"
                color={palette.primary.dark}
            >
                {subtitle}
            </Typography>
            <Box display={'flex'} gap={'1rem'}>
                <ToolbarButton key="agregar" icon={<AddIcon fontSize="small"/>} label="agregar"/>
                <ToolbarButton key="agregar" icon={<SearchIcon fontSize="small"/>} label="buscar"/>
            </Box>
            </FlexBetween>
        </Box>
    )
}

export { Header }