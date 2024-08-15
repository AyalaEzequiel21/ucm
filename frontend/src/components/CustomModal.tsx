import { Box, Modal, useTheme } from "@mui/material"

/**
 * Componente CustomModal:
 * Este componente crea un modal personalizado que se centra en la pantalla y permite la inclusión de cualquier elemento React como su contenido.
 * Proporciona una forma sencilla y flexible de mostrar diálogos o ventanas emergentes en la aplicación, controlando su visibilidad a través de props.
 */
type CustomModalProps = {
    element: React.ReactNode, // El contenido que se mostrará dentro del modal.
    open: boolean, // Define si el modal está abierto o cerrado.
    handleClose: () => void // Función que se ejecuta cuando se intenta cerrar el modal.
}

const CustomModal: React.FC<CustomModalProps> = ({element, open, handleClose}) => {
    
    const {palette} = useTheme()

    return (
        <Modal
            open={open}
            onClose={handleClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Box
                sx={{

                    backgroundColor: palette.grey[300]
                }}
            >
                {element}
            </Box>
        </Modal>
    )
}

export {CustomModal}