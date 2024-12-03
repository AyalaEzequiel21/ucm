import { createContext, useContext, useState } from "react";

interface ModalContextProps {
    openModal: boolean;
    successAlertOpen: boolean;
    errorAlertOpen: boolean;
    toggleModal: () => void;
    toggleSuccessAlert: () => void;
    toggleErrorAlert: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined)

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [openModal, setOpenModal] = useState(false);
    const [successAlertOpen, setSuccessAlertOpen] = useState(false);
    const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  
    const toggleModal = () => setOpenModal(!openModal);
    const toggleSuccessAlert = () => setSuccessAlertOpen(!successAlertOpen);
    const toggleErrorAlert = () => setErrorAlertOpen(!errorAlertOpen);

    return (
        <ModalContext.Provider
          value={{
            openModal,
            successAlertOpen,
            errorAlertOpen,
            toggleModal,
            toggleSuccessAlert,
            toggleErrorAlert,
          }}
        >
          {children}
        </ModalContext.Provider>
      );
}

export const useModalAlert = (): ModalContextProps => {
    const context = useContext(ModalContext);
    if (!context) {
      throw new Error("useModalAlert debe ser usado dentro de ModalAlertProvider");
    }
    return context;
  };