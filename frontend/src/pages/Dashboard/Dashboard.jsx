import "./Dashboard.css";

import SearchBox from "../../components/SearchBox/SearchBox";
import UploadCards from "../../components/UploadCards/UploadCards";
import RecentUploads from "../../components/RecentUploads/RecentUploads";
import DashboardCards from "../../components/DashboardCards/DashboardCards";

function Dashboard() {
  return (
    <main className="dashboard">

      <div className="dashboard-glow glow-one"></div>
      <div className="dashboard-glow glow-two"></div>

      <section className="dashboard-header">

        <div>
          <h1>SmartSearch AI</h1>

          <p>
            Search • Understand • Analyze • Summarize
          </p>
        </div>

      </section>

      <SearchBox />

      <UploadCards />

      <section className="dashboard-bottom">

        <RecentUploads />

        <DashboardCards />

      </section>

    </main>
  );
}

export default Dashboard;