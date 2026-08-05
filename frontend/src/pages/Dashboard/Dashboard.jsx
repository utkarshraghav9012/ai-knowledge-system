import "./Dashboard.css";

import SearchBox from "../../components/SearchBox/SearchBox";
import UploadCards from "../../components/UploadCards/UploadCards";

function Dashboard() {
  return (
    <main className="dashboard">

      <SearchBox />

      <UploadCards />

    </main>
  );
}

export default Dashboard;