import { ClientAddForm } from "@/components/forms/ClientAddForm";
import { PaymentAddForm } from "@/components/forms/PaymentAddForm";
import { ProductAddForm } from "@/components/forms/ProductAddForm";
import { PurchaseAddForm } from "@/components/forms/PurchaseAddForm";
import { SupplierAddForm } from "@/components/forms/SupplierAddForm";
import { UserAddForm } from "@/components/forms/UserAddForm";
import { ViewStateType } from "@/redux/state/viewState";

export const formPitcher = (currentView: ViewStateType, onClose: ()=> void, handleSucessAlert: (message: string)=> void, handleErrorAlert: ()=> void) => {
    switch(currentView){
        case 'clients':
            return <ClientAddForm onCloseModal={onClose} confirmAlertSucess={handleSucessAlert} confirmErrorAlert={handleErrorAlert}/>
        case 'products':
            return <ProductAddForm onCloseModal={onClose} confirmAlertSucess={handleSucessAlert} confirmErrorAlert={handleErrorAlert}/>
        case 'suppliers':
            return <SupplierAddForm onCloseModal={onClose} confirmAlertSucess={handleSucessAlert} confirmErrorAlert={handleErrorAlert}/>
            case 'users':
                return <UserAddForm onCloseModal={onClose} confirmAlertSucess={handleSucessAlert} confirmErrorAlert={handleErrorAlert}/>        
            case 'clientsPayments':
                return <PaymentAddForm onCloseModal={onClose} confirmAlertSucess={handleSucessAlert} confirmErrorAlert={handleErrorAlert}/>        
            case 'purchases':
                return <PurchaseAddForm onCloseModal={onClose} confirmAlertSucess={handleSucessAlert} confirmErrorAlert={handleErrorAlert}/>        
        default:
            return <>Otro</>
        
    }
}