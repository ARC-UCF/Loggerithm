export default function AuditLogs() {
    return (
        <div className="auditpage">
            <h1>Audit Logs</h1>
            <p>Review and edit submitted logs, as well as filter and download logs.</p>
            <p>Filter by date and time, callsign, station call, log type (eg. Field Day, POTA, normal), by contact callsign, mode, tx power, and park id.</p>
            <p>Filters apply to downloads, meaning you can download logs by day, by log type, contact callsign, by callsign, etc.</p>
            <p>You may only edit logs that you have submitted under your callsign.</p>
            <p><em className="goldtext">Gold callsigns</em> are those within the club, while <em className="redtext">red callsigns</em> are not recognized in the club.</p>
            <p><em className="greentext">Green timestamps</em> are within the past 15 minutes, <em className="goldtext">yellow timestamps</em> are within the last 30, and <em className="redtext">red timestamps</em> are any older than 30 minutes.</p>
            <p><em className="bluetext">Blue contact types</em> are for normal logs, <em className="greentext">green contact types</em> are for POTAs, and <em className="redtext">red contact types</em> are for field days.</p>
            <div className="auditholder">
                <div className="auditcard">
                    <div className="loginfoheader">
                        <h2>K4UCF</h2>
                    </div>
                    <div className="loginfobody">
                        <div className="box">
                            <p><b>Mode:</b> FT8</p>
                        </div>
                        <div className="box">
                            <p><b>Band:</b> 40m</p>
                        </div>
                        <div className="box">
                            <p><b>Signal Report Sent:</b> 59</p>
                        </div>
                        <div className="box">
                            <p><b>Signal Report Received:</b> 59</p>
                        </div>
                        <div className="box">
                            <p><b>Frequency:</b> 7.300</p>
                        </div>
                        <div className="box">
                            <p><b>Comments:</b> bro has an amateur extra before skye1</p>
                        </div>
                    </div>
                    <div className="loginfofooter">
                        <div className="audittag audittag--gold">K9SRH</div>
                        <div className="audittag audittag--green">Submitted at 9:35 AM</div>
                        <div className="audittag audittag--red">Field Day Contact</div>
                    </div>
                </div>
            </div>
        </div>
    );
}