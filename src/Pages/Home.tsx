import PotaIcon from "../assets/tree.svg?react";
import NormalIcon from "../assets/ipad.svg?react";
import FieldDayIcon from "../assets/radio2.svg?react";
import SettingsIcon from "../assets/settings.svg?react";
import { useModal } from "../modals/ModalProvider";

export default function Home({ setView }: { setView: (v: "home" | "pota") => void }) {
    const { openModal } = useModal();

    return (
        <div className="contact-container">
            <div className="contact-type">
                <div className="settingschange" onClick={() => openModal("operator")}>
                    <SettingsIcon className="seticon" />
                    <label>Session Settings</label>
                </div>
            </div>
            <div className="contact-type">
                <div className="pota">
                    <PotaIcon className="potaicon" />
                    <label>POTA</label>
                </div>
            </div>
            <div className="contact-type">
                <div className="normal">
                    <NormalIcon className="normalicon" />
                    <label>Normal Logging</label>
                </div>
            </div>
            <div className="contact-type">
                <div className="fieldday">
                    <FieldDayIcon className="fielddayicon" />
                    <label>Field Day</label>
                </div>
            </div>
        </div>
    );
}