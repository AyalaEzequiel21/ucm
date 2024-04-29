import { IMenuItem } from "@/utils/dataUtils/sideBarOptions"
import { ChevronRightOutlined } from "@mui/icons-material"
import { ListItem, ListItemButton, ListItemIcon, Typography, useTheme } from "@mui/material"

type ListItemSidebarProps = {
    listItem: IMenuItem,
    handleClick: (pathKey: string, label: string)=> void,
    activeOption: string
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