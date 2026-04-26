{/* OLD PAGE, NOT FOR USE */}

import { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;
        const data = new FormData(form);

        const email = (data.get("email") as string).trim();
        const agreed = data.get("agreement") !== null;

        if (!agreed) {
            setError("You must agree to the terms to submit a request");
            setSuccess("");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/account-request", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.error || "Request failed");
            }

            setSuccess("Your request has been successfully submitted!");
            setError("");
        } catch (err: any) {
            setError(err.message);
            setSuccess("");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="loginbox">
            <div className="logintop">
                <h2 aria-label="Account Request Page" className="h2-style">Account Request Page</h2>
                <div className="field">
                    <label>Enter Your Callsign</label>
                    <input 
                        type="text"
                        name="callsign"
                        required
                        aria-label="Enter your callsign"
                        aria-required
                        placeholder="Your callsign"
                    />
                </div>
                <div className="field">
                    <label>Enter Your Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        aria-label="Enter your email"
                        aria-required
                        placeholder="Your email"
                    />
                    <h3>Notice</h3>
                    <label>Your email is required to request an account. Your email, plus your approximate location, will be available to site admins.</label>
                    <label>Your IP address will be stored upon submitting your request.</label>
                    <label>This is only used for security purposes and as an aide in verification purposes.</label>
                </div>
                <div className="checkbox-input">
                    <input type="checkbox" name="agreement" />
                    <label>Do you agree to the above listed terms?</label>
                </div>

                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
            </div>
            <div className="loginbottom">
                <button type="submit" aria-label="Request Account">Request Account</button>
            </div>
            <p className="center-aligned">Have an account? <Link to="/">Login here</Link></p>
            <p className="center-aligned">Not a ham? <Link to="/student-sign-up">Sign up here</Link></p>
        </form>
    );
}

export default Signup;