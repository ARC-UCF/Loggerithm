import { useEffect, useState } from "react";
import { useToast } from "../Components/ToastProvider";
import { PostRequest } from "../utils/Requests";

export default function OperatorModal({ onClose }: { defaultValue?: string; onClose: () => void}) {

    const { notify } = useToast();

    const [txPower, setTXPower] = useState("");
    const [mode, setMode] = useState("");
    const [callOperator, setCallOperator] = useState("");
    const [POTAs, setPOTAs] = useState("");
    const [band, setBand] = useState("");
    const [radio, setRadio] = useState("");
    const [active, setActive] = useState("Yes");

    async function enterProvided() {
        const behalfCall = localStorage.getItem("behalfCall") as string;
        const TXP = localStorage.getItem("TXPower") as string;
        const Mode = localStorage.getItem("mode") as string;
        const potas = localStorage.getItem("POTAs") as string;
        const Band = localStorage.getItem("band") as string;
        const Radio = localStorage.getItem("radio") as string;
        const Active = localStorage.getItem("active") as string;

        if (Active) {
            setActive(Active);
        } else {
            setActive("Yes");
        }

        if (!txPower && TXP) {
            setTXPower(TXP);
        }

        if (!callOperator && behalfCall) {
            setCallOperator(behalfCall);
        }

        if (!mode && Mode) {
            setMode(Mode);
        }

        if (!POTAs && potas) {
            setPOTAs(potas);
        }

        if (!band && Band) {
            setBand(Band);
        }

        if (!radio && Radio) {
            setRadio(Radio);
        }
    }

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        console.log("Form was submitted.");

        e.preventDefault();

        const form = e.currentTarget;
        const data = new FormData(form);

        const behalfCall = (data.get("callbehalf") as string).trim().toUpperCase();
        const formTX = (data.get("txpower") as string);
        const fMode = (data.get("mode") as string).trim().toLowerCase();
        const potas = (data.get("potanum") as string).trim().toLowerCase();
        const fBand = (data.get("bandop") as string).trim().toLowerCase();
        const fRadio = (data.get("radiomodel") as string).trim().toLowerCase();
        const fActive = data.get("opactive") as string

        console.log(`${behalfCall}, ${formTX}, ${fMode}`);

        try {
            const packet = await PostRequest("/update-operator-state", { mode: fMode, band: fBand, radio: fRadio, power: formTX, active: fActive}); // We do not need to send station call or parks being activated, parks and station call will be reflected on the logging portion of the software.

            if (packet.status !== 200) {
                notify(`${packet.data.error}`, "error");
                return;
            } else {
                console.log("Successfully passed information.");
            }
        } catch(err: any) {
            notify(err.message, "error");
            return; // Return if there's an error, we do not want the user's client to update if the server didn't take the information.
        }

        if (fActive) {
            setActive(fActive);
            localStorage.setItem("active", fActive);
        }

        if (fBand) {
            localStorage.setItem("band", fBand);
            setBand(fBand);
        } else {
            localStorage.setItem("band", "");
            setBand("");
        }

        if (fRadio) {
            localStorage.setItem("radio", fRadio);
            setRadio(fRadio);
        } else {
            localStorage.setItem("radio", "");
            setRadio("");
        }

        if (behalfCall) {
            localStorage.setItem("behalfCall", behalfCall);
            setCallOperator(behalfCall);
        } else {
            localStorage.setItem("behalfCall", "");
            setCallOperator("");
        }

        if (formTX) {
            localStorage.setItem("TXPower", formTX);
            setTXPower(formTX);
        } else {
            notify("TX power was set to null. Did you see TX power to zero?", "error");
            return;
        }

        if (fMode) {
            localStorage.setItem("mode", fMode);
            setMode(fMode);
        } else {
            notify("Mode was set to null. Did you set mode to null?", "error");
            return;
        }

        if (potas) {
            localStorage.setItem("POTAs", potas);
            setPOTAs(potas);
        } else {
            localStorage.setItem("POTAs", "");
            setPOTAs("");
        }

        notify("Operator was successfully updated!", "success");
        onClose();
    }

    useEffect(() => {
        enterProvided();
    }, []);

    return (
        <form className="modal" onSubmit={handleSubmit}>
            <h2>Update Your Status</h2>
            <label>* indicates required field</label>
            <div className="field">
                <label>Your Station Callsign</label>
                <label>Leave Blank If Using Your Call</label>
                <input
                    name="callbehalf"
                    placeholder="Callsign"
                    aria-label="Enter the callsign you're operating on the behalf of"
                    type="text"
                    minLength={4}
                    maxLength={6}
                    value={callOperator}
                    onChange={(e) => setCallOperator(e.target.value)}
                />
            </div>
            <div className="field">
                <label>Enter Your Park Number (if applicable)</label>
                <label>Separate entries with commas</label>
                <input 
                    name="potanum"
                    placeholder="eg. US-4630"
                    aria-label="Enter your park number (eg. US-4630)"
                    type="text"
                    minLength={4}
                    value={POTAs.toUpperCase()}
                    onChange={(e) => setPOTAs(e.target.value.toUpperCase())}
                />
            </div>
            <div className="field">
                <label>Enter Your Radio Model</label>
                <label>This field is for comparison purposes.</label>
                <input
                    name="radiomodel"
                    placeholder="Radio model (eg. Yaesu FT710)"
                    aria-label="Enter your radio model eg. Yaesu F T 7 10"
                    value={radio.toUpperCase()}
                    onChange={(e) => setRadio(e.target.value.toUpperCase())}
                />
            </div>
            <div className="field">
                <label>Manually Set Your Band Operation *</label>
                <label>Set this field to inform others of what band you are operating on.</label>
                <input 
                    name="bandop"
                    placeholder="Set your band operation (eg. 20M)"
                    aria-label="Manually set your band of operation eg. 20 Meters"
                    value={band.toUpperCase()}
                    onChange={(e) => setBand(e.target.value.toUpperCase())}
                    required
                    aria-required="true"
                />
            </div>
            <div className="field">
                <label>TX Power (watts) *</label>
                <input
                    required
                    name="txpower"
                    placeholder="TX Power"
                    aria-required="true"
                    aria-label="Enter your TX power"
                    type="number"
                    max={1000}
                    min={5}
                    value={txPower}
                    onChange={(e) => setTXPower(e.target.value)}
                />
            </div>
            <div className="field">
                <label>Contact Mode *</label>
                <input
                    required
                    name="mode"
                    placeholder="Mode"
                    aria-required="true"
                    aria-label="Enter your contact mode"
                    type="text"
                    maxLength={10}
                    value={mode.toUpperCase()}
                    onChange={(e) => setMode(e.target.value.toUpperCase())}
                />
            </div>
            <div className="field">
                <label>Are you actively operating?</label>
                <select name="opactive" onChange={(e) => setActive(e.target.value)} value={active}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>
            <div className="field">
                <button onClick={onClose}>Exit</button>
            </div>
            <div className="field">
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}