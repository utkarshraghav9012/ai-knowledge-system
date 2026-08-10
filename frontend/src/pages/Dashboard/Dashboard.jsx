import "./Dashboard.css";

import Hero from "../../components/Hero/Hero";
import SearchBox from "../../components/SearchBox/SearchBox";
import UploadCards from "../../components/UploadCards/UploadCards";

function Dashboard() {
  return (
    <main className="dashboard">

      <Hero />

      <SearchBox />

      <UploadCards />

    </main>
  );
}

export default Dashboard;