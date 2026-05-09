import { useRef } from "react";
import { useToast } from "../Components/ToastProvider";
import { PostRequest } from "../utils/Requests";

export default function FieldDay({ setView }: { setView: (v: "home" | "pota" | "field" | "normal") => void }) {
    const { notify } = useToast();
    const formRef = useRef(null);

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;
        const data = new FormData(form)

        const contact = (data.get("contactcall") as string).trim().toUpperCase();
        const frequency = (data.get("confreq") as string).trim().toUpperCase();
        const region = (data.get("conregion") as string).trim().toUpperCase();
        const ops = (data.get("conop") as string).trim().toUpperCase();
        const comments = data.get("comments") as string

        const load = {
            callsign: localStorage.getItem("callsign")?.toUpperCase(),
            station: localStorage.getItem("behalfcall")?.toUpperCase(),
            radio: localStorage.getItem("radio")?.toUpperCase(),
            power: localStorage.getItem("TXPower"),
            type: "field-day",
            contact: contact,
            mode: localStorage.getItem("mode")?.toUpperCase(),
            band: localStorage.getItem("band")?.toUpperCase(),
            frequency: frequency,
            region: region,
            ops: ops,
            comments: comments,
        }

        console.log("Load created");
        console.log(load);

        try {
            const packet = await PostRequest("/submit-field-day-log", load);

            console.log(packet);

            if (!packet.ok) {
                notify(`An error occurred while submitting your log: ${packet.error}`, "error");
                return;
            }

            if (packet.status !== 200) {
                notify(`An error occurred while submitting your log: error ${packet.status} ${packet.data.error}`, "error");
                return;
            }

            notify("Your log was sent successfully!", "success");
            formRef.current.reset();
        } catch (err: any) {
            console.log(err);
            notify(`An error occurred while sending your log: ${err.message}`, "error");
        }
    }

    return (
        <form className="loginbox" ref={formRef}>
            <div className="logintop">
                <h1>Field Day Log</h1>
                <div className="field">
                    <label>Contact's Callsign</label>
                    <input type="text" name="contactcall" placeholder="eg. K9SRH" required aria-required aria-label="Contact's callsign eg. K 9 S R H" maxLength={6} minLength={4} />
                    {/* Space out the letters to force screen readers to pronouce each letter. Better for clarity, especially here. */}
                </div>
                <div className="field">
                    <label>Frequency of Contact</label>
                    <input type="text" name="confreq" placeholder="eg. 7.200" required aria-required aria-label="Frequency of contact eg. 7.200" maxLength={9} />
                </div>
                <div className="field">
                    <label>Contact's Region</label>
                    <input type="text" name="conregion" placeholder="eg. NFL" required aria-required aria-label="Contact's region eg. N F L" maxLength={6} />
                </div>
                <div className="field">
                    <label>Contact's Operators</label>
                    <input type="text" name="conop" placeholder="Ie. 3O" required aria-required aria-label="Contact's operators" maxLength={6} />
                </div>
                <div className="field">
                    <label>Comments</label>
                    <input type="text" name="comments" placeholder="Additional comments" aria-label="Additional comments" />
                </div>
            </div>
            <div className="loginbottom">
                <button onClick={() => setView("home")}>Exit</button>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}