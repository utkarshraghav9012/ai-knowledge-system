import { FaBell, FaMoon, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">

      <div className="navbar-logo">
        <span className="logo-icon">🧠</span>

        <div className="logo-text">
          <h2>AI Knowledge</h2>
          <p>Search Platform</p>
        </div>
      </div>

      <div className="navbar-search">

        <input
          type="text"
          placeholder="Search PDFs, Videos, Audio, Images..."
        />

      </div>

      <div className="navbar-actions">

        <button className="nav-icon">
          <FaBell />
        </button>

        <button className="nav-icon">
          <FaMoon />
        </button>

        <div className="profile">

          <FaUserCircle className="profile-icon" />

          <div>

            <h4>Utkarsh</h4>
            <span>User</span>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;