import { createContext, useContext, useState } from "react";

{/* Allows us to define and set global variables, which are especially important for certain information pertaining to logs. */}

type AppState = {
    callOperator: string;
    setCallOperator: (val: string) => void;
    txPower: string;
    setTXPower: (val: string) => void;
    mode: string;
    setMode: (val: string) => void;
};

const AppContext = createContext<AppState| null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [txPower, setTXPower] = useState("");
    const [callOperator, setCallOperator] = useState("");
    const [mode, setMode] = useState("");

    return (
        <AppContext.Provider value={{ callOperator, setCallOperator, txPower, setTXPower, mode, setMode }}>
            {children}
        </AppContext.Provider>
    );
}

export function UseApp() {
    const ctx = useContext(AppContext);

    if (!ctx) throw new Error("UseApp must be within AppContext");
    return ctx;
}