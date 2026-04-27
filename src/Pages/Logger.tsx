import { useState } from "react";
import Home from "./Home";
import POTA from "./POTA";
import FieldDay from "./FieldDay";
import NormalLog from "./NormalLog";

export default function Logger() {
    const [view, setView] = useState<"home" | "pota" | "field" | "normal">("home");

    return (
        <>
            {view === "home" && <Home setView={setView}/>}
            {view === "pota" && <POTA setView={setView}/>}
            {view === "field" && <FieldDay setView={setView} />}
            {view === "normal" && <NormalLog setView={setView} />}
        </>
    );
}