import PotaIcon from "../assets/tree.svg?react";
import NormalIcon from "../assets/ipad.svg?react";
import FieldDayIcon from "../assets/radio2.svg?react";
import SettingsIcon from "../assets/settings.svg?react";
import { useModal } from "../modals/ModalProvider";

export default function Home({ setView }: { setView: (v: "home" | "pota") => void }) {
    const { openModal } = useModal();

    return (
        <div className="contact-container">
            
        </div>
    );
}