import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../Components/LogInPage.tsx";
import Layout from "../Layouts/Layout.tsx";
import ProtectedRoute from "../Layouts/ProtectedLayout.tsx";
import Signup from "./SignUpPage.tsx";
import CreateAccount from "./CreateAccount.tsx";
import Profile from "./Profile.tsx";
import Settings from "./Settings.tsx";
import StudentSignup from "./StudentSignUp.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/sign-up" element={<Signup />} />
                    <Route path="/create-account" element={<CreateAccount/>} />
                    <Route path="/student-sign-up" element={<StudentSignup />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route element={<Layout />}>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/settings" element={<Settings />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}