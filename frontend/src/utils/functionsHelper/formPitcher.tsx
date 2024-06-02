import { ClientAddForm } from "@/components/forms/ClientAddForm";
import { ProductAddForm } from "@/components/forms/ProductAddForm";
import { ViewStateType } from "@/redux/state/viewState";

export const formPitcher = (currentView: ViewStateType, onClose: ()=> void, handleSucessAlert: (message: string)=> void, handleErrorAlert: ()=> void) => {
    switch(currentView){
        case 'clients':
            return <ClientAddForm onCloseModal={onClose} confirmAlertSucess={handleSucessAlert} confirmErrorAlert={handleErrorAlert}/>
        case 'products':
            return <ProductAddForm onCloseModal={onClose} confirmAlertSucess={handleSucessAlert} confirmErrorAlert={handleErrorAlert}/>
        default:
            return <>Otro</>
        
    }
}