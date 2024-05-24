import { ClientAddForm } from "@/components/forms/ClientAddForm";
import { ViewStateType } from "@/redux/state/viewState";

export const formPitcher = (currentView: ViewStateType, onClose: ()=> void) => {
    switch(currentView){
        case 'clients':
            return <ClientAddForm onCloseModal={onClose}/>
        default:
            return <>Otro</>
        
    }
}