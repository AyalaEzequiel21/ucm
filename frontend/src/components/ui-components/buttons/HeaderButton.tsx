import React from "react"
import { CustomButton } from "./CustomButton"
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete';
import { useModalAlert } from "@/hooks/useModalAlert";

interface HeaderButtonProps {
    form: React.ReactNode,
    // model: string, 
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

const HeaderButton: React.FC<HeaderButtonProps> = ({form, disabled, type}) => {
    
    const { toggleModal} = useModalAlert();

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
        </>
    )
}

export { HeaderButton }