import { Link } from "react-router-dom";
import { useModal } from "../modals/ModalProvider";
import { useEffect, useState } from "react";

export default function Navbar() {
    const { openModal } = useModal();

    const [call, setCall] = useState("");

    function fetchCall() {
        let storedCall = localStorage.getItem("callsign") as string;

        if (storedCall) {
            setCall(storedCall);
        }
    }

    useEffect(() => {
        fetchCall();
    }, []);

    return (
        <nav>
            <h2>Loggerithm</h2>
            <ul className="nav-links">
                <li><Link to="/log">Log</Link></li>
                <li><Link to="/session">Session</Link></li>
                <li><a onClick={() => openModal("operator")}>Operator</a></li>
                <li><Link to="/contacts">Contacts</Link></li>
                <li><Link to="/users">Users In Session</Link></li>
                <li><Link to="/action-logs">Logs</Link></li>
            </ul>
            {call && <p>Hi, {call}!</p>}
            {!call && <p>Please login!</p>}
        </nav>
    );
}