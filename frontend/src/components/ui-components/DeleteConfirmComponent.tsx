import { Box, Typography, useTheme } from "@mui/material"
import { CustomButton } from "./buttons/CustomButton"
import { useModalAlert } from "@/context/ModalContext"
import { CustomAlert } from "../CustomAlert"
import { getCapitalizeString } from "@/utils/functionsHelper/getCapitalizeString"

interface DeleteConfirmComponentProps {
    onConfirm: () => void,
    isLoading: boolean,
    model: string
}

const DeleteConfirmComponent: React.FC<DeleteConfirmComponentProps> = ({ onConfirm, isLoading, model }) => {
    const {palette} = useTheme()
    const { toggleModal, toggleSuccessAlert, toggleErrorAlert, successAlertOpen, errorAlertOpen } = useModalAlert()

    const handleClick = async () => {
        try{
            onConfirm()
            toggleSuccessAlert()
            toggleModal()
        } catch (error) {
            toggleErrorAlert()
        }
    }


    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: '1rem',
                    backgroundColor: palette.grey[100],
                    p: '4rem 2rem',
                }}
            >
                <Typography variant="h4" sx={{mb: '1rem'}}>Estas seguro de eliminar el/la {model}?</Typography>
                <CustomButton label="Eliminar" onClick={handleClick} disabled={isLoading} mode='dark'/>
            </Box>
            <CustomAlert
                open={successAlertOpen}
                label={`${getCapitalizeString(model)} eliminado correctamente`}
                onCLose={toggleSuccessAlert}
                type="success"
            />
            <CustomAlert
                open={errorAlertOpen}
                label="Error al eliminar elemento"
                onCLose={toggleErrorAlert}
                type="error"
            />
        </>
    )
}

export { DeleteConfirmComponent }


