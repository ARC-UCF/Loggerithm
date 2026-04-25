import { createContext, useContext, useState } from "react";
import Modal from "./ModalTemp.tsx";
import OperatorModal from "./OperatorModal.tsx";

type ModalType = "none" | "operator";

type ModalState = {
    type: ModalType;
    props?: any;
};

type ModalContextType = {
    openModal: (modal: ModalType) => void;
    closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function useModal() {
    const ctx = useContext(ModalContext);
    if (!ctx) throw new Error("Modal context must be used inside ModalProvider");
    return ctx;
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
    const [modal, setModal] = useState<ModalState>({
        type: "none",
        props: null
    });

    function openModal(type: ModalType, props?: any) { {/* This allows us to theoretically pass values into the modal itself */}
        setModal({ type, props });
    }

    function closeModal() {
        setModal({ type: "none", props: null});
    }

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}

            <Modal isOpen={modal.type !== "none"} onClose={closeModal}>
                {modal.type === "operator" && <OperatorModal {...modal.props} onClose={closeModal} />}
            </Modal>
        </ModalContext.Provider>
    );
}