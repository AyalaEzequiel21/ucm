import { Box, Typography, useTheme } from "@mui/material"


type HeaderProps = {
    title: string, 
    subtitle: string
}

const Header: React.FC<HeaderProps> = ({title, subtitle}) => {

    const {palette} = useTheme()
    
    return (
        <Box>
            <Typography
                variant="h2"
                color={palette.primary.dark}
                fontWeight={'bold'}
                sx={{ mb: '5px' }}
            >
                {title}
            </Typography>
            <Typography
                variant="h5"
                color={palette.primary.main}
            >
                {subtitle}
            </Typography>
        </Box>
    )
}

export { Header }