import { IconButton, Menu, MenuItem, Typography, useTheme } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { CustomModal } from "../CustomModal";


interface DropDownMenuProps {
    formEdit: React.ReactNode
    formDelete: React.ReactNode, 
    model: string,
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({formEdit, formDelete, model}) => {
    const { palette } = useTheme()
    // const { openModal, toggleModal, successAlertOpen, errorAlertOpen, toggleErrorAlert, toggleSuccessAlert } = useModalAlert()
    const [localOpenModal, setLocalOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleEditClick = () => {
        setModalContent(formEdit);
        setLocalOpenModal(true);
        handleMenuClose();
    }

    const handleDeleteClick = () => {
        setModalContent(formDelete);
        setLocalOpenModal(true);
        handleMenuClose();
    }

    return(
        <>
            <IconButton
                sx={{
                    color: palette.grey[100],
                    '&:hover': {
                        color: palette.secondary.main,
                    },
                }}
                onClick={handleMenuClick}
            >
                <MoreVertIcon fontSize={'medium'} />
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
            <CustomModal open={localOpenModal} handleClose={() => setLocalOpenModal(false)} element={modalContent} />
        </>
    )
}

export { DropDownMenu }