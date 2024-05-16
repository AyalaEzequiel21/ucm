import { ClientAddForm } from "@/components/forms/ClientAddForm";
import { ViewStateType } from "@/redux/state/viewState";

export const formPitcher = (currentView: ViewStateType) => {
    switch(currentView){
        case 'clients':
            return <ClientAddForm />
    }
}