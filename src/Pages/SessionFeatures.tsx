import { useEffect, useState } from "react";
import { getRequest, PostRequest } from "../utils/Requests";
import { UpdatePageTitle } from "../utils/UpdatePageInfo";
import { useToast } from "../Components/ToastProvider";

export default function SessionFeatures() {
    UpdatePageTitle("Session Features | Loggerithm");
    const { notify } = useToast();
 
    const [call, setCall] = useState("");

    async function getUser() {
        try {
            const packet = await getRequest("/me");

            if (!packet.ok) {
                notify("An error occurred trying to get your session!", "error");
                return;
            }

            if (packet.ok) {
                if (packet.data) {
                    console.log(packet.data);
                } else {
                    notify("You do not appear to be in an active session on the server!", "error");
                }
            }
        } catch (err: any) {
            notify("An error occurred trying to get your session information!", "error");
            return;
        }
    }
    
    {/* Using useEffect so we can load this when the page loads, and so we don't go into an infinite loop and die */}
    useEffect(() => {
        const currentCallsign = localStorage.getItem("callsign") as string;
        console.log("got current call");

        if (currentCallsign) {
            setCall(currentCallsign);
        } else {
            setCall("none");
        }

        getUser();
    }, []);

    async function downloadCSVClick() {
        console.log("Clicked downlaod csv");
        try {
            const packet = await PostRequest("/update-csv");

            if (!packet.ok) {
                notify("Error occurred while trying to update CSV", "error");
                return;
            }

            if (packet.status !== 200) {
                notify(`Error: ${packet.error}`, "error");
                return;
            }

            notify("Successfully updated CSV", "success");
        } catch (err: any) {
            console.log(err);
            notify("Error occurred while trying to update CSV", "error");
        }
    }

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
                <h1>Session Features</h1>
                <label>Your callsign is currently {call}!</label>
                <label>Click the "logout" button to end this session</label>
            </div>
            <div className="loginbottom">
                <button aria-label="Logout" onClick={handleClick}>Logout</button>
                <label>Click the button below to run the code to download and read the CSV on the server</label>
                <button aria-label="Download CSV" onClick={downloadCSVClick}>Download CSV On Server</button>
            </div>
        </div>
    );
}