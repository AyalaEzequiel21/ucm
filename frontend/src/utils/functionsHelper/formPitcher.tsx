import { ClientAddForm } from "@/components/forms/ClientAddForm";
import { PaymentAddForm } from "@/components/forms/PaymentAddForm";
import { PaymentsReportAddFotm } from "@/components/forms/PaymentsReportAddForm";
import { PaymentToSupplierAddForm } from "@/components/forms/PaymentToSupplierAddForm";
import { ProductAddForm } from "@/components/forms/ProductAddForm";
import { PurchaseAddForm } from "@/components/forms/PurchaseAddForm";
import { SaleAddForm } from "@/components/forms/SaleAddForm";
import { SupplierAddForm } from "@/components/forms/SupplierAddForm";
import { UserAddForm } from "@/components/forms/UserAddForm";
import { ViewStateType } from "@/redux/state/viewState";

// `formPitcher` es una función que retorna un formulario basado en el estado actual de la vista (`currentView`).
// Los formularios retornados incluyen funcionalidades para cerrar el modal (`onClose`), manejar alertas de éxito 
// (`handleSucessAlert`) y manejar alertas de error (`handleErrorAlert`).
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
            case 'sales':
                return <SaleAddForm onCloseModal={onClose} confirmAlertSucess={handleSucessAlert} confirmErrorAlert={handleErrorAlert}/>
            case 'paymentsToSuppliers':
                return <PaymentToSupplierAddForm onCloseModal={onClose} confirmAlertSucess={handleSucessAlert} confirmErrorAlert={handleErrorAlert}/>
            case 'paymentsReport':
                return <PaymentsReportAddFotm onCloseModal={onClose} confirmAlertSucess={handleSucessAlert} confirmErrorAlert={handleErrorAlert}/>
        default:
            return <>Otro</>
        
    }
}