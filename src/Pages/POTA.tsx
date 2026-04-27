import { UpdatePageTitle } from "../utils/UpdatePageInfo";

export default function POTA( { setView }: { setView: (v: "home" | "pota" | "field" | "normal") => void }) {
    UpdatePageTitle("POTA Log | Loggerithm");
    return (
        <form className="loginbox">
            <div className="logintop">
                <h2>Submit a POTA Log</h2>
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