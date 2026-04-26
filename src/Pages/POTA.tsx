export default function POTA( {setView }: { setView: (v: "home" | "pota") => void }) {
    return (
        <form className="loginbox">
            <div className="logintop">
                <h2>Submit a POTA Log</h2>
                <div className="field">
                    <label>Enter the callsign of your contact</label>
                    <input
                        type="text"
                        name="contact"
                        placeholder="Contact callsign"
                        aria-label="Enter the contact's callsign"
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
                        placeholder="Frequency"
                        aria-label="Frequency"
                        aria-required
                        required
                    />
                </div>
                <div className="field">
                    <label><b>If this is a Park-To-Park Contact</b>, enter the park number(s) of the contact (each entry separated by a comma)</label>
                    <input
                        type="text"
                        name="parks"
                        placeholder="Contact parks"
                        aria-label="Enter the parks of the contact (if applicable)"
                    />
                </div>
                <div className="field">
                    <label>Transmit Signal Strength</label>
                    <input
                        type="text"
                        name="txstrength"
                        placeholder="Tansmit Signal Strength"
                        aria-label="Your transmitted signal strength"
                        required
                        aria-required
                    />
                </div>
                <div className="field">
                    <label>Received Signal Strength</label>
                    <input 
                        type="text"
                        name="rxstrength"
                        placeholder="Received Signal Strength"
                        aria-label="Your received signal strength"
                        required
                        aria-required
                    />
                </div>
                <div className="field">
                    <label>What is the state they're contacting you from?</label>
                    <input
                        type="text"
                        name="state"
                        placeholder="Contact's state"
                        aria-label="The contact's state"
                        required
                        aria-required
                    />
                </div>
                <div className="field">
                    <label>Comments</label>
                    <input
                        type="text"
                        name="comments"
                        placeholder="Comments"
                        aria-label="Comments"
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