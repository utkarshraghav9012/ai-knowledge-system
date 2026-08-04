import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCloudUploadAlt,
  FaSearch,
  FaFolderOpen,
  FaHistory,
  FaBookmark,
  FaClock,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

const menuItems = [
  { to: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  { to: "/upload", label: "Upload", icon: <FaCloudUploadAlt /> },
  { to: "/search", label: "AI Search", icon: <FaSearch /> },
  { to: "/my-files", label: "My Files", icon: <FaFolderOpen /> },
  { to: "/recent", label: "Recent", icon: <FaClock /> },
  { to: "/bookmarks", label: "Bookmarks", icon: <FaBookmark /> },
  { to: "/history", label: "History", icon: <FaHistory /> },
  { to: "/profile", label: "Profile", icon: <FaUserCircle /> },
  { to: "/settings", label: "Settings", icon: <FaCog /> },
];

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              "sidebar-item" + (isActive ? " active" : "")
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button className="sidebar-item logout" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

        <div className="sidebar-version">
          <h4>AI Knowledge Search</h4>
          <p>v1.0</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;