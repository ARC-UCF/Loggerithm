import { useState } from "react";
import Home from "./Home";
import POTA from "./POTA";

export default function Logger() {
    const [view, setView] = useState<"home" | "pota">("home");

    return (
        <>
            {view === "home" && <Home setView={setView}/>}
            {view === "pota" && <POTA setView={setView}/>}
        </>
    );
}