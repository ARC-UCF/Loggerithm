import { useRef } from "react";
import { useToast } from "../Components/ToastProvider";
import { PostRequest } from "../utils/Requests";

export default function NormalLog({ setView }: { setView: (v: "home" | "pota" | "field" | "normal") => void }) {
    const { notify } = useToast(); // Notifier
    const formRef = useRef(null); // Form ref

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) { // Function
        console.log("Submitted form");
        
        e.preventDefault(); // Prevent defaults

        const form = e.currentTarget;
        const data = new FormData(form); // Get form data

        const contact = (data.get("contactcall") as string).trim().toUpperCase(); // Contact call, force uppercase
        const frequency = (data.get("confreq") as string).trim().toUpperCase(); // Freqency, should be numbers, but force uppercase
        const rstsent = (data.get("txsg") as string).trim().toUpperCase(); // Should be numbers, but force uppercase
        const rstreceive = (data.get("rxsg") as string).trim().toUpperCase(); // Should be numbers, but force uppercase
        const comments = data.get("comments") as string; // Leave comments alone, include whitespace, include whatever capitalization there is.

        const load = { // Create load for serverside packet
            callsign: localStorage.getItem("callsign")?.toUpperCase(), // Client's callsign, uppercase
            station: localStorage.getItem("behalfcall"), // Client's station, if available
            radio: localStorage.getItem("radio")?.toUpperCase(), // Client's radio, force uppercase
            power: localStorage.getItem("TXPower"), // TX power
            type: "normal", // Log type, which is normal
            contact: contact, // Contact's callsign
            mode: localStorage.getItem("mode")?.toUpperCase(), // Client's mode (eg. SSB)
            band: localStorage.getItem("band")?.toUpperCase(), // Client's band (eg. 20M)
            frequency: frequency, // Frequency of contact
            rstsent: rstsent, // Signal sent
            rstreceive: rstreceive, // Signal received
            comments: comments, // Comments
        }

        console.log("Load for server compiled");
        console.log(load); // Debug

        try {
            const packet = await PostRequest("/submit-normal-log", load); // Use PostRequest function in the helper functions.

            console.log(packet); // Debug
            // Above line should help us catch errors with the request, too.

            if (!packet.ok) { // An error occurred while trying to send the thing.
                notify(`An error occurred: ${packet.error}`, "error"); // Notify
                return;
            }

            if (packet.status !== 200) { // If the server isn't sending a 200 status back, something's gone wrong.
                notify(`An error occurred: ${packet.data.error}`, "error"); // Notify
                return;
            }

            notify("Your log was successfully submitted", "success");
            formRef.current.reset(); // Reset form if we've successfully submitted it.
        } catch(err: any) {
            console.log(err); // Debug
            notify(`An error occurred: ${err.message}`, "error"); // Notify of an error, include the error here, too.
        }
    }

    return (
        <form className="loginbox" onSubmit={handleSubmit} ref={formRef}>
            <div className="logintop">
                <h1>Normal Log</h1>
                <div className="field">
                    <label>Callsign's Contact</label>
                    <input type="text" name="contactcall" placeholder="eg. K9SRH"  required aria-required aria-label="Callsign's Contact eg. K 9 S R H" minLength={4} maxLength={6} />
                </div>
                <div className="field">
                    <label>Frequency</label>
                    <input type="text" name="confreq" placeholder="eg. 7.200" aria-required required aria-label="Contact's frequency eg. 7.200" maxLength={9} />
                </div>
                <div className="field">
                    <label>Signal Report Sent</label>
                    <input type="text" name="txsg" placeholder="eg. 59" aria-required required aria-label="Signal Report Sent eg. 5 by 9" maxLength={5} />
                </div>
                <div className="field">
                    <label>Signal Report Received</label>
                    <input type="text" name="rxsg" placeholder="eg. 59" required aria-required aria-label="Signal Report Received eg. 5 by 9" maxLength={5} />
                </div>
                <div className="field">
                    <label>Comments</label>
                    <input type="text" name="comments" placeholder="Comments" aria-label="Additional comments" />
                </div>
            </div>
            <div className="loginbottom">
                <button type="button" onClick={() => setView("home")}>Exit</button>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}