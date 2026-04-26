{/* OLD PAGE, NOT FOR USE */}

export default function createAccount() {
    return(
        <form className="loginbox">
            <div className="logintop">
                <h2 aria-label="Create Your Account" className="h2-style">Create Your Account</h2>
                <div className="field">
                    <label>Confirm Your Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        aria-label="Confirm the email assosciated with this account"
                        aria-required
                        placeholder="Confirm your email"
                    />
                </div>
                <div className="field">
                    <label>Create a Username</label>
                    <input 
                        type="username"
                        name="username"
                        required
                        aria-label="Create a username"
                        aria-required
                        placeholder="Your username"
                    />
                </div>
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
                    <label>Create Your Password</label>
                    <input 
                        type="password"
                        name="password"
                        required
                        aria-label="Create your password"
                        aria-required
                        placeholder="Create your password"
                    />
                </div>
                <div className="field">
                    <label>Confirm Your Password</label>
                    <input 
                        type="password"
                        name="confirmpass"
                        required
                        aria-label="Confirm your password"
                        aria-required
                        placeholder="Confirm your password"
                    />
                </div>
                <div className="field">
                    <label>Enter your discord username</label>
                    <input 
                        type="text"
                        name="discordname"
                        required
                        aria-label="Enter your discord username"
                        aria-required
                        placeholder="Discord username"
                    />
                </div>
                <div className="field">
                    <label>Select the license class you hold</label>
                    <select name="licenseclass">
                        <option value="None">None</option>
                        <option value="Technician">Technician</option>
                        <option value="General">General</option>
                        <option value="Amateur Extra">Amateur Extra</option>
                    </select>
                </div>
            </div>
            <div className="loginbottom">
                <button type="submit" aria-label="Create Account">Create Account</button>
            </div>
        </form>
    );
}