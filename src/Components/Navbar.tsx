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
                <li><a><Link to="/log">Log</Link></a></li>
                <li><a><Link to="/session">Session</Link></a></li>
                <li><a onClick={() => openModal("operator")}>Operator</a></li>
                <li><a><Link to="/audit-logs">Audit Logs</Link></a></li>
            </ul>
            {call && <p>Hi, {call}!</p>}
            {!call && <p>Please login!</p>}
        </nav>
    );
}