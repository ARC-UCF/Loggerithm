import { useEffect, useState } from "react";
import { PostRequest } from "../utils/Requests";
import { UpdatePageTitle } from "../utils/UpdatePageInfo";
import { useToast } from "../Components/ToastProvider";

export default function UpdateCallsign() {
    UpdatePageTitle("Features | Loggerithm");
    const { notify } = useToast();
 
    const [call, setCall] = useState("");
    
    {/* Using useEffect so we can load this when the page loads, and so we don't go into an infinite loop and die */}
    useEffect(() => {
        const currentCallsign = localStorage.getItem("callsign") as string;
        console.log("got current call");

        if (currentCallsign) {
            setCall(currentCallsign);
        } else {
            setCall("none");
        }
    }, []);

    async function handleClick() {
        console.log("Clicked");
        try {
            const packet = await PostRequest("/logout");

            if (!packet.ok) {
                notify("Error when attempting to log out", "error");
                return;
            }

            if (packet.status !== 200) {
                notify(`${packet.data.error}`, "error");
                return;
            }

            localStorage.setItem("callsign", "");
            notify("Successfully logged out", "success");
            window.location.reload();
        } catch (err: any) {
            console.log(err);
            notify("Error when attempting to log out of session", "error");
        }
    }

    return (
        <div className="loginbox">
            <div className="logintop">
                <h2>Session Features</h2>
                <label>Your callsign is currently {call}!</label>
                <label>Click the "logout" button to end this session</label>
            </div>
            <div className="loginbottom">
                <button aria-label="Logout" onClick={handleClick}>Logout</button>
            </div>
        </div>
    );
}