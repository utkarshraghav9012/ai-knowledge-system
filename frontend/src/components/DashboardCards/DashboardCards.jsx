import { FaFilePdf, FaVideo, FaImage } from "react-icons/fa";
import "./DashboardCards.css";

function DashboardCards() {
  const totalUploads = 128;
  const usagePercent = 78;
  const queriesUsed = 156;
  const queriesLimit = 200;

  return (
    <div className="dashboard-cards">
      <section className="stats-card card">
        <div className="stats-header">
          <h3>Statistics</h3>
        </div>

        <div className="stats-total">
          <span className="stats-total-value">{totalUploads}</span>
          <span className="stats-total-label">Total Uploads</span>
          <span className="stats-trend">+12% this week</span>
        </div>

        <div className="stats-grid">
          <div className="stats-item">
            <span className="stats-item-icon tone-pdf"><FaFilePdf /></span>
            <div>
              <h4>45</h4>
              <p>Documents</p>
            </div>
          </div>

          <div className="stats-item">
            <span className="stats-item-icon tone-video"><FaVideo /></span>
            <div>
              <h4>32</h4>
              <p>Videos</p>
            </div>
          </div>

          <div className="stats-item">
            <span className="stats-item-icon tone-image"><FaImage /></span>
            <div>
              <h4>26</h4>
              <p>Images</p>
            </div>
          </div>
        </div>
      </section>

      <section className="usage-card card">
        <h3>AI Usage</h3>

        <div
          className="usage-ring"
          style={{
            background: `conic-gradient(#8b5cf6 ${usagePercent * 3.6}deg, rgba(255,255,255,0.08) 0deg)`,
          }}
        >
          <div className="usage-ring-inner">
            <span>{usagePercent}%</span>
          </div>
        </div>

        <p className="usage-caption">
          AI Queries<br />
          <strong>{queriesUsed} / {queriesLimit}</strong> This Month
        </p>
      </section>
    </div>
  );
}

export default DashboardCards;