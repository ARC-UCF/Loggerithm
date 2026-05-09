import type React from "react";
import { PostRequest } from "../utils/Requests";
import { useToast } from "../Components/ToastProvider";
import { useRef } from "react";

export default function POTA( { setView }: { setView: (v: "home" | "pota" | "field" | "normal") => void }) {
    const { notify } = useToast(); // Notifier
    const formRef = useRef(null);

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        console.log("Form submitted");

        e.preventDefault(); // Prevent defaults

        const form = e.currentTarget;
        const data = new FormData(form); // Get form data

        const contact = (data.get("contact") as string).trim().toUpperCase(); // Contact call, force uppercase
        const frequency = (data.get("frequency") as string).trim().toUpperCase(); // Frequency, should be numbers, but force uppercase
        const contactparks = (data.get("parks") as string)?.trim().toUpperCase(); // Parks, split by commas, force uppercase for beginning parts (eg. where it's US-4630, so force us-4630 to US-4630)
        const rstsent = (data.get("txstrength") as string).trim().toUpperCase(); // Should be numbers, force uppercase anyway
        const rstreceived = (data.get("rxstrength") as string).trim().toUpperCase(); // Should be numbers, force uppercase anyway
        const state = (data.get("state") as string).trim().toUpperCase(); // State, should be two letter identifier (eg. FL or KS)
        const comments = data.get("comments"); // Comments, leave whitespace and capitalization alone

        const load = { // Create packet for the server
            callsign: localStorage.getItem("callsign"), // Client's callsign
            activations: localStorage.getItem("POTAs")?.toUpperCase(), // Client's activated parks, will check serverside
            station: localStorage.getItem("behalfCall"), // Client's station callsign, if any
            radio: localStorage.getItem("radio")?.toUpperCase(), // Client's radio
            power: localStorage.getItem("TXPower"), // Client's tx power
            type: "pota", // Set log type to POTA
            contact: contact, // Contact's callsign, as above
            mode: localStorage.getItem("mode")?.toUpperCase(), // Client's mode of operation (eg. SSB)
            band: localStorage.getItem("band")?.toUpperCase(), // Client's band of operation (eg. 20M)
            frequency: frequency, // Frequency of contact
            contactparks: contactparks, // Contact's parks, split by commas, will be checked on serverside
            rstsent: rstsent, // Signal sent
            rstreceive: rstreceived, // Signal received
            state: state, // Two letter state identifier
            comments: comments, // Comments
        }

        console.log(rstsent, rstreceived); // Debug confirmation

        try {
            const packet = await PostRequest("/submit-pota-log", load); // Send packet to helper to send to server

            if (!packet.ok) { // If packet not ok, notify
                notify(`An error occurred while submitting your log: ${packet.error}`, "error");
                return;
            }

            if (packet.status !== 200) { // If server doesn't send 200, notify
                notify(`An error occurred: ${packet.data.error}`, "error");
                return;
            }

            notify("Your log was successfully submitted", "success"); // Success
            formRef.current.reset(); // Reset form for next contact
        } catch (err: any) { // Catch errors
            notify(`Error: ${err}`, "error");
        }
    }

    return (
        <form className="loginbox" ref={formRef} onSubmit={handleSubmit}>
            <div className="logintop">
                <h1>Submit a POTA Log</h1>
                <div className="field">
                    <label>Enter the callsign of your contact</label>
                    <input
                        type="text"
                        name="contact"
                        placeholder="eg. K9SRH"
                        aria-label="Enter the contact's callsign eg. K 9 S R H"
                        aria-required
                        required
                        maxLength={6}
                        minLength={4}
                    />
                </div>
                <div className="field">
                    <label>What frequency are you on?</label>
                    <input
                        type="text"
                        name="frequency"
                        placeholder="Frequency (eg. 7.200)"
                        aria-label="Frequency eg. 7.200"
                        aria-required
                        required
                    />
                </div>
                <div className="field">
                    <label><b>If this is a Park-To-Park Contact</b>, enter the park number(s) of the contact (each entry separated by a comma)</label>
                    <input
                        type="text"
                        name="parks"
                        placeholder="Contact parks eg. US-0001"
                        aria-label="Enter the parks of the contact (if applicable) (eg. US- 0 0 0 1)"
                    />
                </div>
                <div className="field">
                    <label>Signal Report Sent</label>
                    <input
                        type="text"
                        name="txstrength"
                        placeholder="Signal Report Sent eg. 59"
                        aria-label="Signal Report Sent eg. 5 by 9"
                        required
                        aria-required
                    />
                </div>
                <div className="field">
                    <label>Signal Report Received</label>
                    <input 
                        type="text"
                        name="rxstrength"
                        placeholder="Signal Report Received eg. 59"
                        aria-label="Signal Report Received eg. 5 by 9"
                        required
                        aria-required
                    />
                </div>
                <div className="field">
                    <label>What is the state they're contacting you from?</label>
                    <input
                        type="text"
                        name="state"
                        placeholder="Contact's state eg. FL"
                        aria-label="The contact's state eg. F L"
                        required
                        aria-required
                    />
                </div>
                <div className="field">
                    <label>Comments</label>
                    <input
                        type="text"
                        name="comments"
                        placeholder="Additional comments"
                        aria-label="Additional comments"
                    />
                </div>
            </div>
            <div className="loginbottom">
                <button onClick={() => setView("home")}>Exit</button>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}