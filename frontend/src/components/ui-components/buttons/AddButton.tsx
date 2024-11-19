import React from "react"
import { CustomButton } from "./CustomButton"
import AddIcon from '@mui/icons-material/Add'
import { CustomModal } from "@/components/CustomModal"
import { CustomAlert } from "@/components/CustomAlert"
import { getCapitalizeString } from "@/utils/functionsHelper/getCapitalizeString"
import { useModalAlert } from "@/context/ModalContext"

interface AddButtonProps {
    form: React.ReactNode,
    model: string, 
    disabled?: boolean
}

const AddButton: React.FC<AddButtonProps> = ({form, model, disabled}) => {
    
    const { openModal, toggleModal, successAlertOpen, errorAlertOpen, toggleErrorAlert, toggleSuccessAlert } = useModalAlert();

    return(
        <>
            <CustomButton
                icon={<AddIcon fontSize="small"/>}
                label= 'Agregar'
                onClick={toggleModal}
                disabled={disabled}
                mode='light'
            />

            <CustomModal
                open={openModal}
                handleClose={toggleModal}
                element={form}
            />
            <CustomAlert
                open={successAlertOpen}
                label={`${getCapitalizeString(model)} agregado correctamente`}
                onCLose={toggleSuccessAlert}
                type="success"
            />
            <CustomAlert
                open={errorAlertOpen}
                label="Error al agregar elemento"
                onCLose={toggleErrorAlert}
                type="error"
            />
        </>
    )
}

export { AddButton }