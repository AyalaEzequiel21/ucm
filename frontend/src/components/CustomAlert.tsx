import { Alert, AlertColor, Snackbar } from "@mui/material"

type CustomAlertProps = {
    open: boolean
    onCLose: ()=> void
    label: string,
    type: AlertColor
}

const CustomAlert: React.FC<CustomAlertProps> = ({open, label, onCLose, type}) => {
    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={onCLose}>
            <Alert severity={type} elevation={6} variant="filled">{label}</Alert>
        </Snackbar>
    )
}

export {CustomAlert}
