import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    const isLoggedIn = true;

    if (!isLoggedIn) {
        return <Navigate to="/" />
    }

    return <Outlet />;
}

export default ProtectedRoute;