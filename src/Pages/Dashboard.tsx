import { Activity, useEffect, useState } from "react";
import Home from "./Home";
import POTA from "./POTA";
import FieldDay from "./FieldDay";
import NormalLog from "./NormalLog";
import { UpdatePageTitle } from "../utils/UpdatePageInfo";

export default function Dashboard() {
    const [view, setView] = useState<"home" | "pota" | "field" | "normal">("home");

    const viewChange = () => {
        if (view === "home") {
            UpdatePageTitle("Dashboard | Loggerithm");
        } else if (view === "pota") {
            UpdatePageTitle("POTA Log | Loggerithm");
        } else if (view === "field") {
            UpdatePageTitle("Field Day Log | Loggerithm");
        } else if (view === "normal") {
            UpdatePageTitle("Log | Loggerithm");
        }
    }

    useEffect(() => {
        console.log("View changed");
        viewChange();
    }, [view]);

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