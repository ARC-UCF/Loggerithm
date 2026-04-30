import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer>
            <p>v1.0.0</p>
            <ul className="footer-links">
                <li><a><Link to="/help">Help</Link></a></li>
                <li><a><Link to="/docs">Docs</Link></a></li>
            </ul>
            <p>K4UCF</p>
        </footer>
    );
}