import { Link } from "react-router-dom";
import { UpdatePageTitle } from "../../utils/UpdatePageInfo";

export default function SubmitALog() {
    UpdatePageTitle("Submitting Your First Log | Loggerithm");

    return (
        <>
            <h2>Introduction</h2>
            <p>Congrats on getting your General License (or Extra)! If you got it a while ago, feel free to ignore that message.</p>
            <p>Logging is a required step in doing amateur radio activities at high frequency, and this software was designed just for that!</p>
            <h2>Submitting a Log</h2>
            <h3>Finding the Log Page</h3>
            <p>To locate the logging page, navigate to the navbar at the top of your screen, find the "Log" tab, and press it. It will take you to <Link to="/log">the logging page.</Link></p>
            <h3>Setup Your Operator</h3>
            <p>Once you get to the logging page, it may be important that you update your operator to match what you're doing.</p>
            <p>This step is important, because if your operator is not setup, your logs may not submit correctly. If you're missing information in your operator status, your log will not submit at all.</p>
            <p>This is an easy fix. In the logging page, click the "Settings" button, or, navigate to the navbar once more, and click the "Operator" tab. A modal will pop-up and ask you for your station callsign, your parks (if you're doing a POTA), your TX power, and your mode. <b>TX power and mode are required fields.</b> Make sure to leave station callsign blank if it's your callsign, and leave US parks blank if you're not doing a POTA!</p>
            <h3>Determine What You Need</h3>
            <p>The next step is to determine what type of log you need.</p>
            <p>The software currently allows for <b>three different types of logs:</b></p>
            <ul>
                <li>POTA</li>
                <li>Normal</li>
                <li>Field Day</li>
            </ul>
            <p>You should determine what's needed based upon what kind of setup you have that day, and what you're aiming to do.</p>
            <p>If you're at a park, and are operating for that park, then you need to submit logs via <b>POTA</b>.</p>
            <p>If you're doing the special Field Day event, then you need to submit logs via <b>Field Day</b>.</p>
            <p>Otherwise, if you're just doing normal in the field logging, you will most often only need the <b>Normal Log</b>.</p>
            <h3>Submitting a Normal Log</h3>
            <p>The normal log has 5 inputs, 4 of which are required, and the last of which is optional (comments are not required).</p>
            <p>When making your contact, first enter the callsign of the person you're contacting. Then enter the frequency you made the contact.</p>
            <p>You should then exchange a signal report, in which case you should enter the "signal report sent", which is the report you sent to them, and then the "signal report received", which is the report of your signal.</p>
            <h3>Submitting a POTA Log</h3>
            <p>A POTA log requires the most information.</p>
            <p>First, enter the callsign of your contact and the frequency.</p>
            <p>Then, if they're operating at a park, enter in the park numbers they are operating. <b>Make sure to include "US" or any other country code at the start of the park number.</b></p>
            <p><b>Do not enter in any park numbers if they are not operating any parks.</b></p>
            <p>After that, you should enter the signal report you sent, and the signal report you received, as well as provide the state they are contacting from.</p>
            <h3>Submitting a Field Day Log</h3>
            <p>Field day logs are different from POTA and Normal logs.</p>
            <p>Firstly, enter the callsign and frequency of your contact (as per usual).</p>
            <p>After providing this, you will then need to enter the region of your contact, which may include a state sub-area, or just a state in some cases, as well as how many operators the contact has. For Field Day, this may be something like "3H" or "3O", typically spoken as "3 Hotel" or "3 Oscar". You may also find 3I.</p>
            <p>Whatever the case, enter the number of operators, then proceed to submit your log.</p>
        </>
    );
}