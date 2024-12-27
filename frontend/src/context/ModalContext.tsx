import { CustomAlert } from "@/components/CustomAlert";
import { CustomModal } from "@/components/CustomModal";
import { createContext, useState } from "react";

export interface ModalContextProps {
  openModal: boolean;
  modalContent: React.ReactNode | null;
  successAlertOpen: boolean;
  errorAlertOpen: boolean;
  toggleModal: (content?: React.ReactNode) => void;
  toggleSuccessAlert: (message?: string) => void;
  toggleErrorAlert: (message?: string) => void;
}

export const ModalContext = createContext<ModalContextProps | undefined>(undefined)

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [openModal, setOpenModal] = useState(false)
    const [modalContent, setModalContent] = useState<React.ReactNode | null>(null)
    const [successAlertOpen, setSuccessAlertOpen] = useState(false)
    const [errorAlertOpen, setErrorAlertOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
  
    const toggleModal = (content?: React.ReactNode) => {
      setOpenModal(!openModal)
      setModalContent(content||null)
    }
    const toggleSuccessAlert = (message?: string) => {
      if(message) setAlertMessage(message)
      setSuccessAlertOpen(!successAlertOpen)
    }
    const toggleErrorAlert = (message?: string) => {
      if(message) setAlertMessage(message)
      setErrorAlertOpen(!errorAlertOpen)
    }

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
            <CustomAlert
              open={successAlertOpen}
              label={alertMessage || 'Operación exitosa'}
              onClose={() => toggleSuccessAlert()}
              type="success"
            />
            <CustomAlert
              open={errorAlertOpen}
              label={alertMessage || 'Error al realizar la operación'}
              onClose={() => toggleErrorAlert()}
              type="error"
            />
        </ModalContext.Provider>
      );
}

