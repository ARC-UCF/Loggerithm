export default function NormalLog({ setView }: { setView: (v: "home" | "pota" | "field" | "normal") => void }) {
    return (
        <form className="loginbox">
            <div className="logintop">
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
                <button onSubmit={() => setView("home")}>Exit</button>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}