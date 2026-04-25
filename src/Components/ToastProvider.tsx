import { useContext, createContext, useState } from "react";
import Info from "../assets/information.svg?react"; {/* This will always have this error because it's silly, unless we do a declaration for it. */}

{/* Toast provider, useful for writing quick toasts for the user. */}

type Toast = {
    id: number;
    message: string;
    type: "success" | "error" | "info";
};

type ToastContextType = {
    notify: (message: string, type?: Toast["type"]) => void;
};

{/* Create our toast context */}

const ToastContext = createContext<ToastContextType | null>(null);

{/* useToast function to actually use the toast */}

export function useToast() {
    const ctx = useContext(ToastContext);

    if (!ctx) throw new Error("useToast must be inside of a provider");

    return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    {/* This function actually lets use send the messages to the user for them to see. */}
    {/* !!! Important! Notify must be within some part of the react setup, otherwise it'll error. */}

    function notify(message: string, type: Toast["type"] = "info") {
        const id = Date.now();

        setToasts((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 6000); {/* Yadda, yadda, timeout is in ms, 6000 ms is 6 seconds. */}
    }

    return (
        <ToastContext.Provider value={{ notify }}>
            {children}

            <div className="toast-container">
                {toasts.map((t) => (
                    <div key={t.id} className={`toast ${t.type}`}> {/* Map type to classes set in the css so they're applied dynamically. */}
                        <Info className={`toasticon ${t.type}`}/>{t.message}
                    </div>
                ))}
            </div>

        </ToastContext.Provider>
    );
}