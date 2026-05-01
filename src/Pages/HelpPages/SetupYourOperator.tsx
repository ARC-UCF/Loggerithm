import { UpdatePageTitle } from "../../utils/UpdatePageInfo";

export default function SetupYourOperator() {
    UpdatePageTitle("Setup Your Operator | Loggerithm");

    return(
        <>
            <h2>Locating the Operator Modal</h2>
            <p>The operator modal can be located in one of two places:</p>
            <ul>
                <li>On the navbar, by clicking the "Operator" tab, or</li>
                <li>By going to Log, then clicking "Settings"</li>
            </ul>
            <p>This lets you update your operator, which will reflect across the server and to everyone's devices.</p>
            <p>This is also important for logging, as the information you provide will be included in the log for everyone to view and audit.</p>
            <h2>Updating Your Operator State</h2>
            <h3>Station/Operator Callsign</h3>
            <p>Your station/operator callsign can be changed in this modal. This means that when you submit your log, a station callsign field will be added to reflect the station you are operating as.</p>
            <p><b>IMPORTANT:</b> do <b>NOT</b> enter a callsign into this field if you're operating under your callsign. The callsign you are using for the site will be automatically included in the log.</p>
            <p>For example, if you're operating as K4UCF, you would enter your station callsign as "K4UCF" to reflect you are operating under your callsign.</p>
            <p>The callsign you are using for the site will still be attached to the logs, and will be reflected to designate you as the operator of the station.</p>
            <h3>Park Number</h3>
            <p>The park number is used for POTA activations. You should leave this field blank if you're not activating a park.</p>
            <p>You can include as many parks as you would like in this field, as long as you're activating them, and each entry should be separated by a comma.</p>
            <p>The system will automatically find each park you enter and validate it for you, as long as each entry is separated by a comma. You may receive an error if the system is unable to validate the park numbers you enter into the parks field.</p>
            <h3>Your Radio Model</h3>
            <p>Your radio model is a miscelleanous piece of information you can provide.</p>
            <p>Your radio model will be shown to everyone else currently operating, as part of your operator state and information.</p>
            <p>Your radio model will also be included in the logs for auditing purposes, to know who used what radio and at what time, what power it was at, and to keep track of everything.</p>
            <p>Although this is an optional field, it is <b>encouraged</b> to update it according to the radio you are currently operating with.</p>
            <p>Some ways you might want to list the radio are:</p>
            <ul>
                <li>By radio model (eg. G90)</li>
                <li>By radio brand and model (eg. Yaesu FT710)</li>
            </ul>
            <p>Just the brand of the radio is <b>insufficient</b>, as it does not make it clear what radio you are using.</p>
            <h3>Your Band of Operation</h3>
            <p>This is another piece of miscelleanous information you can provide.</p>
            <p><b>If you are logging with other software, you should indicate what band you are on with this form.</b></p>
            <p>The band of operation field will be shown to every other operator, to indicate what band you are currently on, to help with coordination.</p>
            <h3>TX Power</h3>
            <p><b>This is a required field.</b></p>
            <p>Indicate your tx power on a range of 5 to 1000 watts.</p>
            <p>This field is important for logging, as it will show what the transmit power of the radio is during operation and logging.</p>
            <p>You may not set the field lower than 5 and higher than 1000 watts.</p>
            <p>You should update the field accordingly when your transmit power changes for any reason.</p>
            <h3>Mode</h3>
            <p><b>This is a required field.</b></p>
            <p>Indicate the mode you are operating in.</p>
            <p>Some modes you might be operating in may include:</p>
            <ul>
                <li>SSB</li>
                <li>FT8</li>
                <li>FT4</li>
                <li>PSK31</li>
                <li>RTTY</li>
                <li>and so on.</li>
            </ul>
            <p>Your mode will be indicated for logging, but also for the purposes of displaying what you're operating in to your fellow operators during times you're operating with others.</p>
            <h3>Actively Operating</h3>
            <p>Your actively operating status is shown to the rest of the operators, and indicates if you're actively using a radio or not, or actively operating.</p>
            <p>If you're not actively operating, the server will indicate that to the rest of the operators, but will still have you listed in the system, just as inactive.</p>
            <p>This is because the server will have you listed in the system and visible to other operators, and your current state will be shown to help organize.</p>
            <h2>You're All Set!</h2>
            <p>Congrats, you'll have successfully setup your operator, which means you're not ready to transmit and log!</p>
            <p>As this software is primarily for voice contacts and SSB, that's the primary logging which will be kept. However, it is also used as an organization tool, and hence, it's requested no matter what mode you're using, you log in and indicate your status to your fellow operators.</p>
            <p>Have fun on the air!</p>
        </>
    );
}