import React from "react"
import { CustomButton } from "./CustomButton"
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete';
import { CustomAlert } from "@/components/CustomAlert"
import { getCapitalizeString } from "@/utils/functionsHelper/getCapitalizeString"
import { useModalAlert } from "@/context/ModalContext";

interface HeaderButtonProps {
    form: React.ReactNode,
    model: string, 
    type: 'add' | 'edit' | 'delete',
    disabled?: boolean,
}

const getIcon = (type: HeaderButtonProps['type']) => {
    switch(type){
        case 'add':
            return <AddIcon fontSize="small"/>
        case 'edit':
            return <EditIcon fontSize="small"/>
        case 'delete':
            return <DeleteIcon fontSize="small"/>
    }
}

const getLabel = (type: HeaderButtonProps['type']) => {
    switch(type){
        case 'add':
            return 'Agregar'
        case 'edit':
            return 'Editar'
        case 'delete':
            return 'Eliminar'
    }
}

const HeaderButton: React.FC<HeaderButtonProps> = ({form, model, disabled, type}) => {
    
    const { toggleModal, successAlertOpen, errorAlertOpen, toggleErrorAlert, toggleSuccessAlert } = useModalAlert();

    const onSubmit = () => {
        toggleModal(form)
    }
    return(
        <>
            <CustomButton
                icon={getIcon(type)}
                label= {getLabel(type)}
                onClick={onSubmit}
                disabled={disabled}
                mode='light'
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

export { HeaderButton }