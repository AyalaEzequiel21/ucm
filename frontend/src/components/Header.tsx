import { Box, Typography, useTheme } from "@mui/material"
import { FlexBetween } from "./FlexBetween"

/**
 * Componente Header:
 * Este componente es un encabezado que muestra un título y un subtítulo, y también proporciona una serie de funcionalidades y estados, como la apertura de un modal, la gestión de alertas de éxito y error, y la renderización condicional de un botón de agregar.
 * Utiliza `useSelector` para obtener el estado actual de la vista y la información del usuario desde el store de Redux.
 * Es útil en vistas principales donde se necesita un encabezado con interactividad.
 */
type HeaderProps = {
    title: string, // El título principal que se muestra en el encabezado.
    subtitle: string, // El subtítulo que se muestra debajo del título principal.
    children?: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({title, subtitle, children}) => {

    const {palette} = useTheme()
    
    return (
        <Box>
            <Typography
                color={palette.primary.dark}
                fontSize={'35px'}
                fontWeight={'bold'}
            >
                {title ? title : ''}
            </Typography>
            <FlexBetween>
                <Typography
                    variant="h4"
                    color={palette.primary.dark}
                >
                    {subtitle}
                </Typography>
                <Box display={'flex'} gap={'1rem'}>
                    {children}
                </Box>
            </FlexBetween>
        </Box>
    )
}

export { Header }