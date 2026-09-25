import { Activity, useState } from "react";
import Home from "./Home";
import POTA from "./POTA";
import FieldDay from "./FieldDay";
import NormalLog from "./NormalLog";

export default function Dashboard() {
    const [view, setView] = useState<"home" | "pota" | "field" | "normal">("home");

    // We use the Activity component from React now to keep the component states the same when we switch between them. This prevents the erasure of form inputs when navigating the log page.
    // We still need to implement components to prevent the change of the user's location.

    return (
        <>
            <Activity mode={view === "home" ? "visible" : "hidden"}>
                <Home setView={setView} />
            </Activity>
            <Activity mode={view === "pota" ? "visible" : "hidden"}>
                <POTA setView={setView} />
            </Activity>
            <Activity mode={view === "field" ? "visible" : "hidden"}>
                <FieldDay setView={setView} />
            </Activity>
            <Activity mode={view === "normal" ? "visible" : "hidden"}>
                <NormalLog setView={setView}/>
            </Activity>
        </>
    );
}