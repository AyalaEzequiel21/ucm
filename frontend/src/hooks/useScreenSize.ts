import { useMediaQuery, useTheme } from "@mui/material";

const useScreenSize = () => {
    const theme = useTheme()

    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const isTablet = useMediaQuery(theme.breakpoints.up('md') && theme.breakpoints.down('lg'))
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))

    return { isMobile, isTablet, isDesktop }
}

export default useScreenSize;

