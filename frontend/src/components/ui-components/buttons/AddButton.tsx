import { useState } from "react"
import { CustomButton } from "./CustomButton"
import AddIcon from '@mui/icons-material/Add'
import { CustomModal } from "@/components/CustomModal"
import { CustomAlert } from "@/components/CustomAlert"

type AddButtonProps = object

const AddButton: React.FC<AddButtonProps> = () => {
    
    const [openModal, setOpenModal] = useState(false)
    const [successAlertOpen, setSuccessAlertOpen] = useState(false)
    const [errorAlertOpen, setErrorAlertOpen] = useState(false)

    const toogleModal = () => setOpenModal(!openModal)

    const toogleSuccess = () => setSuccessAlertOpen(!successAlertOpen)

    const toogleError = () => setErrorAlertOpen(!errorAlertOpen)

    return(
        <>
            <CustomButton
                icon={<AddIcon fontSize="small"/>}
                label= 'Agregar'
                onClick={toogleModal}
                disabled={false}
                mode='dark'
            />

            <CustomModal
                open={openModal}
                handleClose={toogleModal}
                element={<>Lista</>}
            />
            <CustomAlert
                open={successAlertOpen}
                label="Elemento agregado correctamente"
                onCLose={toogleSuccess}
                type="success"
            />
            <CustomAlert
                open={errorAlertOpen}
                label="Error al agregar elemento"
                onCLose={toogleError}
                type="error"
            />
        </>
    )
}

export { AddButton }