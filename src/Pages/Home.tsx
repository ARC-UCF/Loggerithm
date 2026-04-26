import { useModal } from "../modals/ModalProvider";

export default function Home({ setView }: { setView: (v: "home" | "pota") => void }) {
    const { openModal } = useModal();

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