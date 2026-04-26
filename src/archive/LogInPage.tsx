{/* OLD PAGE, NOT FOR USE */}

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

function CallsignPrompt() {
    const navigate = useNavigate();

    const [error, setError] = useState("");

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;
        const data = new FormData(form);

        const callsign = (data.get("callsign") as string).trim().toUpperCase();
        const password = (data.get("password") as string).trim();

        try {
            const res = await fetch("http://localhost:3000/login", {
                method: "POST",
                credentials: "include", // important for cookies later
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ callsign, password })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Login failed");
            }

            // success → go to app
            navigate("/app");

        } catch (err: any) {
            setError(err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="loginbox">
            <div className="logintop">
                <h2 aria-label="Login" className="h2-style">Login</h2>
                <div className="field">
                    <label>Callsign</label>
                    <input 
                        type="text"
                        name="callsign"
                        required
                        aria-label="Input your callsign"
                        aria-required
                        placeholder="Input your callsign"
                    />
                </div>
                <div className="field">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        required
                        aria-label="Enter your password"
                        aria-required
                        placeholder="Enter your password"
                    />
                </div>

                {error && <p className="error">{error}</p>}
            </div>
            <div className="loginbottom">
                <button type="submit" aria-label="Login">Login</button>
            </div>
            <p className="center-aligned">Don't have an account? <Link to="/sign-up">Sign up here</Link></p>
        </form>
    );
}

export default CallsignPrompt;