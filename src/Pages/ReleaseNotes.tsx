export default function ReleaseNotes() {
    return (
        <div className="releasenotesback">
            <h1>Release Notes</h1>
            <p className="desc">These are the release notes for the latest version plus the previous versions. This starts at v1.1.0.</p>
            <div className="releasenoteholder">
                <div className="releasenote">
                    <h2>v1.1.0 (latest)</h2>
                    <h3>What's New</h3>
                    <ul>
                        <li>Added release notes</li>
                        <li>Renamed "log" to "dashboard"</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}