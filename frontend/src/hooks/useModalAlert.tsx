import { ModalContext, ModalContextProps } from "@/context/ModalContext";
import { useContext } from "react";

export const useModalAlert = (): ModalContextProps => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModalAlert debe ser usado dentro de ModalAlertProvider");
    }
    return context;
}