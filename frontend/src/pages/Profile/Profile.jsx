import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import "./Profile.css";

function Profile() {
  const [tab, setTab] = useState("profile");
  const [fullName, setFullName] = useState("Utkarsh Raghav");
  const [email, setEmail] = useState("utkarsh@example.com");
  const [phone, setPhone] = useState("+91 9876543210");

  return (
    <div className="profile-page card">
      <div className="profile-header">
        <h2>Profile Settings</h2>
        <div className="profile-header-user">
          <FaUserCircle className="profile-header-avatar" />
        </div>
      </div>

      <div className="profile-identity">
        <FaUserCircle className="profile-avatar" />
        <div>
          <h3>{fullName}</h3>
          <p>{email}</p>
        </div>
        <span className="plan-tag">Pro Plan</span>
      </div>

      <div className="profile-tabs">
        <button className={tab === "profile" ? "active" : ""} onClick={() => setTab("profile")}>Profile</button>
        <button className={tab === "security" ? "active" : ""} onClick={() => setTab("security")}>Security</button>
        <button className={tab === "subscription" ? "active" : ""} onClick={() => setTab("subscription")}>Subscription</button>
      </div>

      {tab === "profile" && (
        <div className="profile-form">
          <div className="form-field">
            <label>Full Name</label>
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>

          <div className="form-field">
            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-field">
            <label>Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <button className="save-btn">Save Changes</button>
        </div>
      )}

      {tab === "security" && (
        <div className="profile-form">
          <div className="form-field">
            <label>Current Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <div className="form-field">
            <label>New Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <button className="save-btn">Update Password</button>
        </div>
      )}

      {tab === "subscription" && (
        <div className="profile-form">
          <p className="sub-info">You are currently on the <strong>Pro Plan</strong>.</p>
          <button className="save-btn">Manage Subscription</button>
        </div>
      )}
    </div>
  );
}

export default Profile;