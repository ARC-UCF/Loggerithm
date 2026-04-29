import { Link } from "react-router-dom";
import { useModal } from "../modals/ModalProvider";

export default function Navbar() {
    const { openModal } = useModal();

    return (
        <nav>
            <h2>Loggerithm v1.0.0</h2>
            <ul className="nav-links">
                <li><a><Link to="/log">Log</Link></a></li>
                <li><a><Link to="/update-call">Change Callsign</Link></a></li>
                <li><a onClick={() => openModal("operator")}>Operator</a></li>
                <li><a><Link to="/audit-logs">Audit Logs</Link></a></li>
            </ul>
            <p>Hi, K9SRH!</p>
        </nav>
    );
}