import useScreenSize from "@/hooks/useScreenSize"
import { Button, useTheme } from "@mui/material"

/**
 * Componente ToolbarButton:
 * Este componente muestra un botón con un ícono y un texto opcional.
 * Utiliza el hook `useTheme` para obtener la paleta de colores del tema actual.
 * Usa `useScreenSize` para determinar si la vista es móvil y ajustar el contenido del botón.
 */
type ToolbarButtonProps = {
    icon: React.ReactNode | null,  // Ícono opcional que se muestra en el botón.
    label: string,                 // Texto del botón que describe su función.
    handleClick: () => void,       // Función que maneja el evento de clic en el botón.
    disabled?: boolean             // Indica si el botón debe estar deshabilitado.
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({icon, label, handleClick, disabled}) => {
    const { palette } = useTheme()
    const { isMobile }  = useScreenSize()

    return (
        <Button
            onClick={handleClick}
            disabled={disabled}
            sx={{
                border: ` 2px solid ${palette.primary.dark}`,
                borderRadius: '0.33rem',
                color: palette.primary.dark,
                '&:hover': {
                    backgroundColor: palette.primary.dark,
                    color: palette.secondary.main,

                }
            }}
        >
            {icon} {isMobile ? '' : label}
        </Button>
    )
}

export { ToolbarButton }