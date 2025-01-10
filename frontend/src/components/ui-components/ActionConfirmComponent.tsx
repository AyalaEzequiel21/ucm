import { Box, Typography, useTheme } from "@mui/material"
import { CustomButton } from "./buttons/CustomButton"
import { useModalAlert } from "@/hooks/useModalAlert"
import { getCapitalizeString } from "@/utils/functionsHelper/getCapitalizeString"

interface ActionConfirmComponentProps {
    onConfirm: () => void,
    isLoading: boolean,
    model: string,
    type?: 'delete' | 'validate' 
}

const ActionConfirmComponent: React.FC<ActionConfirmComponentProps> = ({ onConfirm, isLoading, model, type }) => {
    const {palette} = useTheme()
    const { toggleModal, toggleSuccessAlert, toggleErrorAlert } = useModalAlert()

    const handleClick = async () => {
        try{
            onConfirm()
            toggleSuccessAlert(`${getCapitalizeString(model)} ${type === 'delete' ? 'eliminado' : 'validado'} exitosamente`)
            toggleModal()
        } catch (error) {
            toggleErrorAlert(`Error al ${type === 'delete' ? 'eliminar' : 'validar'} el/la ${model}`)
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
                <Typography variant="h4" sx={{mb: '1rem'}}>Estas seguro de {type === 'delete' ? 'eliminar' : 'validar'} el/la {model}?</Typography>
                <CustomButton label={type === 'delete' ? 'Eliminar' : 'Validar'} onClick={handleClick} disabled={isLoading} mode='dark'/>
        </Box>
    )
}

export { ActionConfirmComponent }


