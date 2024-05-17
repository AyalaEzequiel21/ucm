import { Box, Modal, useTheme } from "@mui/material"

type CustomModalProps = {
    element: React.ReactNode,
    open: boolean,
    handleClose: ()=> void
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