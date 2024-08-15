import { Box, Typography, useTheme } from "@mui/material"
import { FlexBetween } from "./FlexBetween"
import { ToolbarButton } from "./ToolbarButton"
import AddIcon from '@mui/icons-material/Add'
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useState } from "react"
import { CustomModal } from "./CustomModal"
import { formPitcher } from "@/utils/functionsHelper/formPitcher"
import { CustomAlert } from "./CustomAlert"

/**
 * Componente Header:
 * Este componente es un encabezado que muestra un título y un subtítulo, y también proporciona una serie de funcionalidades y estados, como la apertura de un modal, la gestión de alertas de éxito y error, y la renderización condicional de un botón de agregar.
 * Utiliza `useSelector` para obtener el estado actual de la vista y la información del usuario desde el store de Redux.
 * Es útil en vistas principales donde se necesita un encabezado con interactividad.
 */
type HeaderProps = {
    title: string, // El título principal que se muestra en el encabezado.
    subtitle: string // El subtítulo que se muestra debajo del título principal.
}

const Header: React.FC<HeaderProps> = ({title, subtitle}) => {

    const {palette} = useTheme()
    const currentView = useSelector((state: RootState) => state.viewState.currentView)
    const userLogin = useSelector((state: RootState) => state.user.userLogin)
    const [openModal, setOpenModal] = useState(false)
    const [sucessAlertState, setSucessAlertState] = useState(false)
    const [sucessMessage, setSucessMessage] = useState('')
    const [errorAlertState, setErrorAlertState] = useState(false)
    


    const toogleModal = () => setOpenModal(!openModal)
    const handleClickAdd = () => {
        toogleModal()
    }

    const handleCloseModal = () => setOpenModal(false)
    const handleSucessAlert = (message: string) => {
        setSucessMessage(message)
        setSucessAlertState(true)
    }

    const handleErrorAlert = () => setErrorAlertState(true)
    
    return (
        <Box>
            <Typography
                color={palette.primary.dark}
                fontSize={'35px'}
                fontWeight={'bold'}
            >
                {title}
            </Typography>
            <FlexBetween>
            <Typography
                variant="h4"
                color={palette.primary.dark}
            >
                {subtitle}
            </Typography>
            <Box display={'flex'} gap={'1rem'}>
                {currentView !== 'home' && <ToolbarButton key="agregar" disabled={(userLogin?.role === 'delivery' && currentView !== 'paymentsReport')} icon={<AddIcon fontSize="small"/>} label="agregar" handleClick={handleClickAdd}/>}
            </Box>
            </FlexBetween>
            <CustomModal open={openModal} handleClose={handleCloseModal} element={formPitcher(currentView, handleCloseModal, handleSucessAlert, handleErrorAlert)}/>
            <CustomAlert
                open={sucessAlertState}    
                label={sucessMessage}
                onCLose={()=> setSucessAlertState(false)}
                type="success"
            />
            <CustomAlert
                open={errorAlertState}    
                label={"Ha ocurrido un error"}
                onCLose={()=> setErrorAlertState(false)}
                type="error"
            />
        </Box>
    )
}

export { Header }