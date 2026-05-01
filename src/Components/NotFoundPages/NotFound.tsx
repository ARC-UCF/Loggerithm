import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="notfound">
            <h1>Error 404</h1>
            <h2>Uh-oh! We couldn't contact this page!</h2>
            <p>The page you're looking for doesn't seem to exist. Are you sure you went to the right page?</p>
            <p><Link to="/log">Go home</Link></p>
            <p><Link to="/help">Go to help</Link></p>
        </div>
    );
}