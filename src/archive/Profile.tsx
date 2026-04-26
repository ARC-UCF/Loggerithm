{/* OLD PAGE, NOT FOR USE */}

export default function Profile() {
    return (
        <div className="profile-container">
            <div className="profileheader">
                <p className="profile-callsigncard">K9SRH</p>
                <p className="profile-blurb"><i>I like amateur radio and all things amateury</i></p>
            </div>
            <div className="profileleft">
                <div className="profilefield">
                    <p><b>License Class</b></p>
                    <p>Amateur Extra</p>
                </div>
                <div className="profilefield">
                    <p><b>Club Role</b></p>
                    <p>Treasurer</p>
                </div>
                <div className="profilefield">
                    <p><b>Discord Username</b></p>
                    <p>skye.bite</p>
                </div>
                <div className="profilefield">
                    <p><b>Account Created</b></p>
                    <p>April 18th, 2026, 4:35PM</p>
                </div>
            </div>
            <div className="profiledivider">
                <hr></hr>
            </div>
            <div className="profileright">
                <div className="profilefield">
                    <p><b>Time of Last Contact</b></p>
                    <p>N/A</p>
                </div>
                <div className="profilefield">
                    <p><b>Total QSOs</b></p>
                    <p>6</p>
                </div>
                <div className="profilefield">
                    <p><b>Most Used Band</b></p>
                    <p>N/A</p>
                </div>
                <div className="profilefield">
                    <p><b>Most Used Mode</b></p>
                    <p>Voice</p>
                </div>
            </div>
            <div className="profilelinks">
                <hr></hr>
                <h2>User Links</h2>
            </div>
            <div className="profilebottom">
                <hr></hr>
                <h2>Recent Activity</h2>
            </div>
        </div>
    );
}