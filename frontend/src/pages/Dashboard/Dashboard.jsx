import "./Dashboard.css";

import Hero from "../../components/hero/hero";
import SearchBox from "../../components/SearchBox/SearchBox";
import UploadCards from "../../components/UploadCards/UploadCards";
import RecentUploads from "../../components/RecentUploads/RecentUploads";
import DashboardCards from "../../components/DashboardCards/DashboardCards";

function Dashboard() {
  return (
    <main className="dashboard">
      <div className="dashboard-glow glow-one"></div>
      <div className="dashboard-glow glow-two"></div>

      <Hero />
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