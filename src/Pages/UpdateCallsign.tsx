import { useEffect, useState } from "react";
import { PostRequest } from "../utils/Requests";
import { UpdatePageTitle } from "../utils/UpdatePageInfo";

export default function UpdateCallsign() {
    UpdatePageTitle("Update Callsign | Loggerithm");

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
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

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        {/* Same thing from the callsign prompt applies here; making sure you have a call and what not and updating it on the backend plus frontend for future use. */}
        e.preventDefault();

        const form = e.currentTarget;
        const data = new FormData(form);

        const currentCallsign = localStorage.getItem("callsign") as string;
        const newCallsign = (data.get("callsign") as string).trim().toUpperCase();

        if (!newCallsign) {
            setSuccess("");
            setError("Please provide a new callsign");
            return;
        }

        if (!currentCallsign) {
            setSuccess("");
            setError("You do not have a current callsign");
            return;
        }

        try {
            const packet = await PostRequest("/update-callsign", { currentcall: currentCallsign, newCall: newCallsign });

            const ok = packet.ok

            if (!ok) {
                throw new Error(error || "Unable to complete request")
            }

            localStorage.setItem("callsign", newCallsign);

            setSuccess(`Successfully updated callsign to ${newCallsign}`);
            setError("");
        } catch (err: any) {
            setSuccess("");
            setError(err.message);
        }
    }

    return (
        <form className="loginbox" onSubmit={handleSubmit}>
            <div className="logintop">
                <h2>Update Callsign</h2>
                <label>Your callsign is currently {call}!</label>
                <div className="field">
                    <label>Different user? Update your callsign</label>
                    <input
                        type="text"
                        placeholder="Your callsign"
                        aria-label="Enter your updated callsign"
                        aria-required
                        required
                        name="callsign"
                    />
                </div>
                {success && <p className="success">{success}</p>}
                {error && <p className="error">{error}</p>}
            </div>
            <div className="loginbottom">
                <button aria-label="Submit updated callsign">Submit Updated Callsign</button>
            </div>
        </form>
    );
}