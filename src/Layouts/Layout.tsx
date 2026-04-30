import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar.tsx";
import Footer from "../Components/Footer.tsx";

export default function Layout() {
    {/* This layout is the normal layout, which leads to an outlet based upon what's listed in App.tsx */}
    return (
        <div className="wrap">
            <Navbar />
            <div className="container">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}