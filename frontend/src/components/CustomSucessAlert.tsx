import { Alert, Snackbar } from "@mui/material"

type CustomSucessAlertProps = {
    open: boolean
    onCLose: ()=> void
    label: string
}

const CustomSucessAlert: React.FC<CustomSucessAlertProps> = ({open, label, onCLose}) => {
    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={onCLose}>
            <Alert severity="success" elevation={6} variant="outlined">{label}</Alert>
        </Snackbar>
    )
}

export {CustomSucessAlert}
