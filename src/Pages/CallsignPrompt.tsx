import { PostRequest, getRequest } from "../utils/Requests";
import { useNavigate } from "react-router-dom";
import { useToast } from "../Components/ToastProvider";
import { UpdatePageTitle } from "../utils/UpdatePageInfo";

export default function CallsignPrompt () {
    UpdatePageTitle("Login | Loggerithm");
    const navigate = useNavigate();
    const { notify } = useToast();

    {/* Using useState here to set error and success messages which we'll get a response from from the backend */}

    async function checkForCall() {
        let callsign = localStorage.getItem("callsign") as string

        if (callsign) {
            try {
                const packet = await getRequest(`/check-call?callsign=${encodeURIComponent(callsign)}`); {/* Submit check-call with a query parameter. Might make this an object later. */}

                const ok = packet.ok;

                if (!ok) {
                    notify("Error occurred when attempt to check your callsign", "error");
                    return;
                }

                if (packet.status !== 200) {
                    notify(`${packet.data.error}`, "error");
                    return;
                }

                console.log("Checking callsign.");
                
                if (ok && packet.data.callsign === callsign) {
                    console.log(`${callsign} exists in the system; navigating to main page.`);
                    {/* If the user already has their callsign in local storage, there's no reason to keep them on this page. Navigate elsewhere. */}
                    navigate("/log");
                } else {
                    console.log(`${packet.data.callsign} is not ${callsign}`);
                }
            } catch (err: any) {
                console.log(err);
                notify(err.message, "error");
            } 
        }
    }

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        {/* Preventing default; defining form and getting form data (just the callsign) */}

        const form = e.currentTarget;
        const data = new FormData(form);

        const callsign = (data.get("callsign") as string).trim().toUpperCase();

        if (!callsign) {
            notify("Please enter a callsign!", "error");
            return;
        }

        try {
            const packet = await PostRequest("/login", { call: callsign });

            console.log(packet);

            if (!packet.ok) {
                throw new Error(packet.error);
            }

            if (packet.status !== 200) {
                notify(`${packet.data.error}`, "error");
                return;
            }

            {/* If successful, set the callsign variable in localstorage to the callsign the user submitted, which will be uppercase. Will be uesd for referencing who's who. */}

            localStorage.setItem("callsign", callsign);
            notify("Successfully logged in!", "success");
            navigate("/log");
        } catch (err: any) {
            notify(err.message, "error");
        }
    }

    {/* Check for callsign when the user loads the page. */}
    checkForCall();
    {/* Silly reminder that React will run twice in dev mode. Will not run twice in production. */}

    return (
        <form className="loginbox" onSubmit={handleSubmit}>
            <div className="logintop">
                <h2>Callsign Login</h2>
                <div className="field">

                    {/* Some general information stuff so people know what to do */}

                    <label>You are required to enter the callsign you are using for this session. Please use your personal callsign, not the callsign you will identify your station with.</label>
                    <label>Please enter your callsign</label>

                    {/* This uses aria-label and aria-required for screen reader accessibility purposes */}

                    <input
                        type="text"
                        name="callsign"
                        placeholder="Your callsign"
                        aria-label="Enter your callsign"
                        aria-required
                        required
                    />
                </div>
            </div>
            <div className="loginbottom">
                <button aria-label="Submit callsign" >Submit Callsign</button>
            </div>
        </form>
    );
}