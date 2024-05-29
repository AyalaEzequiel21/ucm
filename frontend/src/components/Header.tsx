import { Box, Typography, useTheme } from "@mui/material"
import { FlexBetween } from "./FlexBetween"
import { ToolbarButton } from "./ToolbarButton"
import AddIcon from '@mui/icons-material/Add'
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useState } from "react"
import { CustomModal } from "./CustomModal"
import { formPitcher } from "@/utils/functionsHelper/formPitcher"
import { CustomSucessAlert } from "./CustomSucessAlert"

type HeaderProps = {
    title: string, 
    subtitle: string
}

const Header: React.FC<HeaderProps> = ({title, subtitle}) => {

    const {palette} = useTheme()
    const currentView = useSelector((state: RootState) => state.viewState.currentView)
    const [openModal, setOpenModal] = useState(false)
    const [sucessAlertState, setSucessAlertState] = useState(false)
    const [sucessMessage, setSucessMessage] = useState('')


    const toogleModal = () => setOpenModal(!openModal)
    const handleClickAdd = () => {
        toogleModal()
    }

    const handleCloseModal = () => setOpenModal(false)
    const handleSucessAlert = (message: string) => {
        setSucessMessage(message)
        setSucessAlertState(true)
    }
    
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
                {currentView !== 'home' && <ToolbarButton key="agregar" icon={<AddIcon fontSize="small"/>} label="agregar" handleClick={handleClickAdd}/>}
            </Box>
            </FlexBetween>
            <CustomModal open={openModal} handleClose={handleCloseModal} element={formPitcher(currentView, handleCloseModal, handleSucessAlert)}/>
            <CustomSucessAlert
                open={sucessAlertState}    
                label={sucessMessage}
                onCLose={()=> setSucessAlertState(false)}
            />
        </Box>
    )
}

export { Header }