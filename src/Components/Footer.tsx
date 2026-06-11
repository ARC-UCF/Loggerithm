import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer>
            <ul className="footer-links">
                <li><Link to="/help">Help</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/release-notes">Release Notes</Link></li>
            </ul>
        </footer>
    );
}