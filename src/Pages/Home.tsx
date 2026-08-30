import { useEffect, useState } from "react";
import { useModal } from "../modals/ModalProvider";

export default function Home({ setView }: { setView: (v: "home" | "pota" | "field" | "normal") => void }) {
    const { openModal } = useModal();

    const [now, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const zuluTime = now.toLocaleTimeString("en-US", {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });

    const localTime = now.toLocaleTimeString("en-US", {
        timeZoneName: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    })

    const localTime24hour = now.toLocaleTimeString("en-US", {
        timeZoneName: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    })

    {/* Current plan is to, at some point, overhaul this page (and a few others) to make them look even nicer and be more functional. */}

    return (
        <section className="contacts-area">
            <div className="leftbar">
                <div className="timedisp">
                    <p className="zululabel">ZULU</p>
                    <p className="zuludisp">{zuluTime}</p>
                    <div className="dateholder">
                        <p className="datedimmed">Date</p>
                        <p className="datedisp">{now.toDateString()}</p>
                    </div>
                    <div className="localholder">
                        <p className="localdimmed">Local</p>
                        <p className="localdisp">{localTime}</p>
                    </div>
                    <div className="localholder">
                        <p className="localdimmed">Local (24 hour)</p>
                        <p className="localdisp">{localTime24hour}</p>
                    </div>
                </div>
                <div className="submitcontacts">
                    <p className="title">Operations</p>
                        <button className="contact-choice" onClick={() => openModal("operator")}>
                            Settings
                        </button>
                        <button className="contact-choice" onClick={() => setView("normal")}>
                            Normal Log
                        </button>
                        <button className="contact-choice" onClick={() => setView("pota")}>
                            POTA
                        </button>
                        <button className="contact-choice" onClick={() => setView("field")}>
                            Field Day
                        </button>
                </div>
            </div>
            <div className="rightbar">
                
            </div>
            <div className="topdash">
                <div className="top-container">
                    <div className="sessiondisplay">
                        <div className="sessioncard">
                            <div className="sessioninfo">
                                <p className="sestitle">
                                    Session Information
                                </p>
                                <div className="stats">
                                    <div className="stat">
                                        <p className="statname">
                                            Session Host
                                        </p>
                                        <p className="statval">
                                            KG4YDW
                                        </p>
                                    </div>
                                    <div className="stat">
                                        <div className="statname">
                                            Session Began
                                        </div>
                                        <div className="statval">
                                            8:30 AM EDT
                                        </div>
                                    </div>
                                    <div className="stat">
                                        <div className="statname">
                                            Session Runtime
                                        </div>
                                        <div className="statval">
                                            2:30:00
                                        </div>
                                    </div>
                                    <div className="stat">
                                        <p className="statname">
                                            Session Type
                                        </p>
                                        <p className="statval">
                                            Field Day
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sessioncard">
                            <div className="sessioninfo">
                                <p className="sestitle">
                                    Session Health
                                </p>
                                <div className="stats">
                                    <div className="stat">
                                        <p className="statname">
                                            Database Connection
                                        </p>
                                        <p className="statval">
                                            Connected
                                        </p>
                                    </div>
                                    <div className="stat">
                                        <p className="statname">
                                            User Session
                                        </p>
                                        <p className="statval">
                                            Connected
                                        </p>
                                    </div>
                                    <div className="stat">
                                        <p className="statname">
                                            Backend Connection
                                        </p>
                                        <p className="statval">
                                            Connected
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sessioncard">
                            <h1>Stats</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottomdash">

            </div>
        </section>
    );
}