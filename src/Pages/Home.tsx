import { useModal } from "../modals/ModalProvider";
import { UpdatePageTitle } from "../utils/UpdatePageInfo";

export default function Home({ setView }: { setView: (v: "home" | "pota") => void }) {
    UpdatePageTitle("Log | Loggerithm")
    const { openModal } = useModal();

    {/* Current plan is to, at some point, overhaul this page (and a few others) to make them look even nicer and be more functional. */}

    return (
        <section className="contacts-area">
            <button className="contact-choice" onClick={() => openModal("operator")}>
                Settings
            </button>
            <button className="contact-choice">
                Normal Log
            </button>
            <button className="contact-choice" onClick={() => setView("pota")}>
                POTA
            </button>
            <button className="contact-choice">
                Field Day
            </button>
        </section>
    );
}