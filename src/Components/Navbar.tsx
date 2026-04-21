import ProfileIcon from "../assets/usericon.svg?react";

export default function Navbar() {
    return (
        <div className="navbar_header">
            <div className="navbar_left">
                <h2>Header</h2>
            </div>
            <div className="navbar_right">
                <button className="navbar_profile">
                    <ProfileIcon className="profile_logo" />
                    <p>K9SRH</p>
                </button>
            </div>
        </div>
    );
}