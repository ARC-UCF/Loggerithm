export default function FieldDay({ setView }: { setView: (v: "home" | "pota" | "field" | "normal") => void }) {
    return (
        <form className="loginbox">
            <div className="logintop">
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