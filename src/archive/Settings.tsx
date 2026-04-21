import { useState } from "react";

export default function Settings() {
    const [form, setForm] = useState({
        class: "Amateur Extra",
        role: "Treasurer",
        discorduser: "skye.bite"
    });

    const [editing, setEditing] = useState(false);
    const [original, setOriginal] = useState(form);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setForm(form => ({
            ...form,
            [e.target.name]: e.target.value
        }));
    }

    function handleCancel() {
        setForm(original);
        setEditing(false);
    }

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit} className="settingsbox">
            <h1>Account Settings</h1>
            <div className="profilesetting">
                <p>Callsign/username</p>
                <input
                    name="callsign"
                    readOnly={true}
                    value="K9SRH"
                    onChange={handleChange}
                />
            </div>
            <div className="profilesetting">
                <p>Email</p>
                <input 
                    name="email"
                    readOnly={true}
                    value="4noahsentelle@gmail.com"
                    onChange={handleChange}
                />
            </div>
            <div className="profilesetting">
                <p>License Class</p>
                <select name="class" disabled={!editing} onChange={handleChange} value={form.class}>
                    <option value="Technician">Technician</option>
                    <option value="General">General</option>
                    <option value="Amateur Extra">Amateur Extra</option>
                </select>
            </div>
            <div className="profilesetting">
                <p>Club Role</p>
                <select name="role" disabled={!editing} onChange={handleChange} value={form.role}>
                    <option value="Member">Member</option>
                    <option value="Alumni">Alumni</option>
                    <option value="Committee Chair">Committee Chair</option>
                    <option value="Secretary">Secretary</option>
                    <option value="Treasurer">Treasurer</option>
                    <option value="Vice President">Vice President</option>
                    <option value="President">President</option>
                    <option value="Faculty Advisor">Faculty Advisor</option>
                </select>
            </div>
            <div className="profilesetting">
                <p>Discord Username</p>
                <input 
                    name="discorduser"
                    readOnly={!editing}
                    onChange={handleChange}
                    value={form.discorduser}
                />
            </div>
            {!editing &&
                <div className="button-area">
                    <button className="edit-button" onClick={() => setEditing(true)}>Edit</button>
                </div>
            }
            {editing && 
                <div className="button-area">
                    <button className="save-button" type="submit">Save</button>
                    <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                </div>
            }
        </form>
    );
}