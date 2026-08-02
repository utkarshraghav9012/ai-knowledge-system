import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

import Hero from "../../components/Hero/Hero";
import SearchBox from "../../components/SearchBox/SearchBox";

function Dashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };

  return (

    <main className="dashboard">

      {/* Background Glow */}

      <div className="dashboard-glow glow-one"></div>

      <div className="dashboard-glow glow-two"></div>

      {/* Hero */}

      <Hero />

      {/* AI Search */}

      <SearchBox />

      {/* Temporary Workspace */}

      <section className="coming-section">

        <h2>AI Workspace</h2>

        <p>
          Search, Upload and Analytics components will be added here.
        </p>

      </section>

      {/* Logout */}

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>

    </main>

  );

}

export default Dashboard;