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

            </div>
            <div className="bottomdash">

            </div>
        </section>
    );
}