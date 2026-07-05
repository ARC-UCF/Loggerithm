import { Link } from "react-router-dom";
import { useModal } from "../modals/ModalProvider";
import { useEffect, useState } from "react";

export default function Navbar() {
    const { openModal } = useModal();

    const [call, setCall] = useState("");

    const [now, setTime] = useState(new Date());
    const [menuOpen, setMenuOpen] = useState(false);

    function fetchCall() {
        let storedCall = localStorage.getItem("callsign") as string;

        if (storedCall) {
            setCall(storedCall);
        }
    }

    useEffect(() => {
        fetchCall();

        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const localTime = now.toLocaleTimeString("en-US", {
        timeZoneName: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    })

    return (
        <nav>
            <ul className="nav-top">
                <div className="ham-holder">
                    <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
                <div className="time-disp">
                    <div className="circle"></div>
                    {localTime}
                </div>
                <div className="qsosec">
                    <div className="holder">
                        <p className="type">
                            Session QSOs
                        </p>
                        <p className="value">
                            34
                        </p>
                    </div>
                    <div className="holder">
                        <p className="type">
                            QSOs Last Hour
                        </p>
                        <p className="value">
                            20
                        </p>
                    </div>
                    <div className="holder">
                        <p className="type">
                            24 Hour QSOs
                        </p>
                        <p className="value">
                            34
                        </p>
                    </div>
                </div>
            </ul>
            {call && <p>Hi, {call}!</p>}
            {!call && <p>Please login!</p>}
            <div className={`sidemenu ${menuOpen ? "open" : ""}`}>
                <p className="namepart">Loggerithm</p>
                <Link className="sidebarbutton" to="/dashboard">Dashboard</Link>
                <Link className="sidebarbutton" to="/session">Session</Link>
                <Link className="sidebarbutton" to="/contacts">Contacts</Link>
                <button className="sidebarbutton" onClick={() => openModal("operator")}>Operator</button>
            </div>
        </nav>
    );
}