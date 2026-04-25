import { BrowserRouter, Routes, Route } from "react-router-dom";
import CallsignPrompt from "./CallsignPrompt.tsx";
import Layout from "../Layouts/Layout.tsx";
import UpdateCallsign from "./UpdateCallsign.tsx";
import ProtectedRoute from "../Layouts/ProtectedLayout.tsx";
import { AppProvider } from "../Components/AppProvider.tsx";
import { ToastProvider } from "../Components/ToastProvider.tsx";
import { ModalProvider } from "../modals/ModalProvider.tsx";
import Logger from "./Logger.tsx";

export default function App() {
    return (
        <AppProvider>
            <ToastProvider>
                <ModalProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route element={<Layout />}>
                                <Route path="/" element={<CallsignPrompt />} /> {/* Laying out default pathways. Default path is callsign prompt (for now); we'll check localstorage and always route here if no callsign is detected. */}
                            </Route>
                            <Route element={<ProtectedRoute />}> {/* Elements located under this are protected and require a user to have their callsign in local storage to access them. */}
                                <Route element={<Layout />}>
                                    <Route path="/update-call" element={<UpdateCallsign />} />
                                    <Route path="/log" element={<Logger />} />
                                </Route>
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </ModalProvider>
            </ToastProvider>
        </AppProvider>
    );
}