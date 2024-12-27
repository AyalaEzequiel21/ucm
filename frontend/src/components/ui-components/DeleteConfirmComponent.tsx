import { Box, Typography, useTheme } from "@mui/material"
import { CustomButton } from "./buttons/CustomButton"
import { useModalAlert } from "@/hooks/useModalAlert"
import { getCapitalizeString } from "@/utils/functionsHelper/getCapitalizeString"

interface DeleteConfirmComponentProps {
    onConfirm: () => void,
    isLoading: boolean,
    model: string
}

const DeleteConfirmComponent: React.FC<DeleteConfirmComponentProps> = ({ onConfirm, isLoading, model }) => {
    const {palette} = useTheme()
    const { toggleModal, toggleSuccessAlert, toggleErrorAlert } = useModalAlert()

    const handleClick = async () => {
        try{
            onConfirm()
            toggleSuccessAlert(`${getCapitalizeString(model)} eliminado exitosamente`)
            toggleModal()
        } catch (error) {
            toggleErrorAlert(`Error al eliminar el/la ${model}`)
        }
    }

    return (
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
    )
}

export { DeleteConfirmComponent }


