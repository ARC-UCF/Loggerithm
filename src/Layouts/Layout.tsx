import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar.tsx";

export default function Layout() {
    return (
        <div className="wrap">
            <Navbar />
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
}