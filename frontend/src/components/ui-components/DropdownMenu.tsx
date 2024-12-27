import { IconButton, Menu, MenuItem, Typography, useTheme } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { useModalAlert } from "@/hooks/useModalAlert";

interface DropDownMenuProps {
    formEdit: React.ReactNode
    formDelete: React.ReactNode, 
    model: string,
    mode: 'dark' | 'light',
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({formEdit, formDelete, mode}) => {
    const { palette } = useTheme()
    const { toggleModal} = useModalAlert()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleEditClick = () => {
        toggleModal(formEdit)
        handleMenuClose();
    }

    const handleDeleteClick = () => {
        toggleModal(formDelete)
        handleMenuClose();
    }

    return(
        <>
            <IconButton
                sx={{
                    backgroundColor: mode === 'dark' ? palette.grey[300] : undefined,
                    color: mode === 'dark' ? palette.primary.dark : palette.grey[100],
                    '&:hover': {
                        backgroundColor: mode === 'dark' ?  palette.grey[500] : undefined,
                        color: palette.secondary.main,
                    },
                }}
                onClick={handleMenuClick}
            >
                <MoreHorizIcon fontSize={'medium'} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                sx={{
                    borderRadius: '0.5rem',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                }}
            >
                <MenuItem 
                    onClick={handleEditClick} 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        color: palette.primary.dark,
                            '&:hover': { color: palette.secondary.main }
                    }}
                >
                    <EditIcon />
                    <Typography>Editar</Typography>
                </MenuItem>
                <MenuItem 
                    onClick={handleDeleteClick} 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        color: palette.primary.dark,
                            '&:hover': { color: palette.error.light}
                    }}
                >
                    <DeleteIcon />
                    <Typography>Eliminar</Typography>
                </MenuItem>
            </Menu>
        </>
    )
}

export { DropDownMenu }