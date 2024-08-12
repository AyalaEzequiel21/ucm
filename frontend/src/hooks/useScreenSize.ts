import { useMediaQuery, useTheme } from "@mui/material";

// HOOK PARA OBTENER EL TAMANIO DE LA PANTALLA UTILIZADA
const useScreenSize = () => {
    const theme = useTheme()

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const isTablet = useMediaQuery(theme.breakpoints.up('md') && theme.breakpoints.down('lg'))
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))

    return { isMobile, isTablet, isDesktop }
}

export default useScreenSize;

