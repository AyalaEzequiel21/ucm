import { IMenuItem } from "@/utils/dataUtils/sideBarOptions"
import { ChevronRightOutlined } from "@mui/icons-material"
import { ListItem, ListItemButton, ListItemIcon, Typography, useTheme } from "@mui/material"

/**
 * Componente ListItemSidebar:
 * Este componente representa un elemento individual en la barra lateral (sidebar) de la aplicación.
 * Cada elemento del sidebar puede estar activo o inactivo, dependiendo de la opción seleccionada.
 * Además, permite al usuario navegar a diferentes secciones de la aplicación mediante la función `handleClick`.
 */
type ListItemSidebarProps = {
    listItem: IMenuItem, // Objeto que representa la opción del menú, incluyendo su etiqueta, icono y clave de ruta.
    handleClick: (pathKey: string, label: string) => void, // Función que maneja el evento de clic en el elemento, redirigiendo a la ruta asociada.
    activeOption: string // Cadena que indica la opción actualmente activa en la barra lateral.
}

const ListItemSidebar: React.FC<ListItemSidebarProps> = ({listItem, handleClick, activeOption}) => {

    const { palette } = useTheme()
    const lcLabel = listItem.label.toLocaleLowerCase()


    return (
        <ListItem disablePadding>
            <ListItemButton
                onClick={()=> {handleClick(listItem.pathKey, lcLabel)}}
                sx={{
                    backgroundColor:
                        activeOption === lcLabel
                        ? palette.secondary.main
                        : "transparent",
                    color:
                        activeOption === lcLabel
                        ? palette.secondary.main
                        : palette.grey[100],
                        '&:hover': {
                            backgroundColor: palette.secondary.main
                        }
                }}
            >
                <ListItemIcon
                    sx={{
                        color:
                          activeOption === lcLabel
                            ? palette.primary.dark
                            : palette.grey[100],
                    }}
                >
                    {listItem.icon}
                </ListItemIcon>
                <Typography
                    variant="h5"
                    sx={{
                        color: activeOption === lcLabel
                        ? palette.primary.dark
                        : palette.grey[100],
                    }}
                >
                    {listItem.label}
                </Typography>
                {activeOption === lcLabel && (
                    <ChevronRightOutlined sx={{ ml: "auto", color: palette.grey[100] }} />
                )}
            </ListItemButton>
        </ListItem>
    )
}

export { ListItemSidebar }