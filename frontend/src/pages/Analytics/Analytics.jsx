import "./Analytics.css";

const stats = [
  { title: "Total Files", value: "0" },
  { title: "PDF Files", value: "0" },
  { title: "Videos", value: "0" },
  { title: "Images", value: "0" },
  { title: "Audio", value: "0" },
  { title: "AI Searches", value: "0" },
];

function Analytics() {
  return (
    <div className="analytics-page">

      <div className="analytics-header">
        <h1>Analytics Dashboard</h1>
        <p>
          Overview of your AI Knowledge Search usage.
        </p>
      </div>

      <div className="stats-grid">

        {stats.map((item) => (

          <div
            className="stat-card"
            key={item.title}
          >

            <h2>{item.value}</h2>

            <p>{item.title}</p>

          </div>

        ))}

      </div>

      <div className="analytics-grid">

        <div className="chart-card">

          <h3>Upload Activity</h3>

          <div className="chart-placeholder">

            Chart Coming Soon

          </div>

        </div>

        <div className="chart-card">

          <h3>Storage Usage</h3>

          <div className="chart-placeholder">

            Pie Chart Coming Soon

          </div>

        </div>

      </div>

      <div className="recent-analytics">

        <h3>Recent Insights</h3>

        <ul>

          <li>No uploads yet.</li>

          <li>No AI searches yet.</li>

          <li>No summaries generated.</li>

          <li>No OCR processing yet.</li>

        </ul>

      </div>

    </div>
  );
}

export default Analytics;