import { useEffect } from "react";
import { UseApp } from "../Components/AppProvider";
import { useToast } from "../Components/ToastProvider";

export default function OperatorModal({ defaultValue, onClose }: { defaultValue?: string; onClose: () => void}) {

    const { notify } = useToast();
    const { txPower, setTXPower, mode, setMode, callOperator, setCallOperator } = UseApp();

    async function enterProvided() {
        const behalfCall = localStorage.getItem("behalfCall") as string;
        const TXP = localStorage.getItem("TXPower") as string;
        const Mode = localStorage.getItem("mode") as string;

        if (TXP) {
            if (txPower !== TXP) {
                setTXPower(TXP);
            }
        }

        if (Mode) {
            if (mode !== Mode) {
                setMode(Mode);
            }
        }

        if (behalfCall) {
            if (callOperator !== behalfCall) {
                setCallOperator(behalfCall);
            }
        } else {
            if (callOperator !== "") {
                setCallOperator("");
            }
        }
    }

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        console.log("Form was submitted.")

        e.preventDefault();

        const form = e.currentTarget;
        const data = new FormData(form);

        const behalfCall = (data.get("callbehalf") as string).trim().toUpperCase();
        const formTX = (data.get("txpower") as string);
        const fMode = (data.get("mode") as string).trim().toLowerCase();

        console.log(`${behalfCall}, ${formTX}, ${fMode}`);

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

        notify("Operator was successfully updated!", "success");
        onClose();
    }

    enterProvided();

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
                <input 
                    name="potanum"
                    placeholder="eg. US-4630"
                    aria-label="Enter your park number (eg. US-4630)"
                    type="text"
                    minLength={4}
                />
            </div>
            <div className="field">
                <label>TX Power (watts) *</label>
                <input
                    required
                    name="txpower"
                    placeholder="TX Power"
                    aria-required
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
                    aria-required
                    aria-label="Enter your contact mode"
                    type="text"
                    maxLength={10}
                    value={mode.toUpperCase()}
                    onChange={(e) => setMode(e.target.value.toUpperCase())}
                />
            </div>
            <div className="field">
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}