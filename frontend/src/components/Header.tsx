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
                color={palette.primary.dark}
                fontSize={'35px'}
                fontWeight={'bold'}

                sx={{ mb: '3px' }}
            >
                {title}
            </Typography>
            <Typography
                variant="h4"
                color={palette.primary.main}
            >
                {subtitle}
            </Typography>
        </Box>
    )
}

export { Header }