import { ClientAddForm } from "@/components/forms/ClientAddForm";
import { ViewStateType } from "@/redux/state/viewState";

export const formPitcher = (currentView: ViewStateType, onClose: ()=> void, handleSucessAlert: (message: string)=> void, handleErrorAlert: ()=> void) => {
    switch(currentView){
        case 'clients':
            return <ClientAddForm onCloseModal={onClose} confirmAlertSucess={handleSucessAlert} confirmErrorAlert={handleErrorAlert}/>
        default:
            return <>Otro</>
        
    }
}