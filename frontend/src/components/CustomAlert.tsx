import { Alert, AlertColor, Snackbar } from "@mui/material"

type CustomAlertProps = {
    open: boolean
    onCLose: ()=> void
    label: string,
    type: AlertColor
}

/**
 * Componente CustomAlert:
 * Este componente es una alerta personalizada que se muestra como un Snackbar en la pantalla. 
 * Se utiliza para notificar al usuario sobre el éxito, advertencias, información o errores 
 * en diversas operaciones dentro de la aplicación. La alerta se cierra automáticamente 
 * después de 3 segundos o cuando el usuario interactúa con ella.
 */
const CustomAlert: React.FC<CustomAlertProps> = ({open, label, onCLose, type}) => {
    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={onCLose}>
            <Alert severity={type} elevation={6} variant="filled">{label}</Alert>
        </Snackbar>
    )
}

export {CustomAlert}
