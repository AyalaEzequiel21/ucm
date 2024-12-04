import { CustomModal } from "@/components/CustomModal";
import { createContext, useContext, useState } from "react";

interface ModalContextProps {
    openModal: boolean;
    modalContent: React.ReactNode | null;
    successAlertOpen: boolean;
    errorAlertOpen: boolean;
    toggleModal: (content?: React.ReactNode) => void;
    toggleSuccessAlert: () => void;
    toggleErrorAlert: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined)

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [openModal, setOpenModal] = useState(false)
    const [modalContent, setModalContent] = useState<React.ReactNode | null>(null)
    const [successAlertOpen, setSuccessAlertOpen] = useState(false)
    const [errorAlertOpen, setErrorAlertOpen] = useState(false)
  
    const toggleModal = (content?: React.ReactNode) => {
      setOpenModal(!openModal)
      setModalContent(content||null)
    }
    const toggleSuccessAlert = () => setSuccessAlertOpen(!successAlertOpen)
    const toggleErrorAlert = () => setErrorAlertOpen(!errorAlertOpen)

    return (
        <ModalContext.Provider
          value={{
            openModal,
            modalContent,
            successAlertOpen,
            errorAlertOpen,
            toggleModal,
            toggleSuccessAlert,
            toggleErrorAlert,
          }}
        >
          {children}
          {openModal && modalContent && (
                <CustomModal
                    open={openModal}
                    handleClose={() => toggleModal()}
                    element={modalContent}
                />
            )}
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