import { Navigate, Outlet } from "react-router-dom";
{/* We'll be using this protected route and adapting it from its origin to force users to submit their callsign for audit and competitive purposes */}

function ProtectedRoute() {
    const callsign = (localStorage.getItem("callsign") as string).trim().toUpperCase();
    {/* The above fetches the callsign from localstorage. */}

    if (!callsign) {
        {/* No callsign found? Route to "/", which is the callsign prompt page. */}
        return <Navigate to="/" />
    }

    {/* Would send a post/get request for callsign confirmation here, but, will implement code to verify user existence when a log is submitted. */}

    return <Outlet />;
}

export default ProtectedRoute;