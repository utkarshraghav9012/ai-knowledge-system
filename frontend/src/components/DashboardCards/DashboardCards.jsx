import {
  FiFileText,
  FiVideo,
  FiMic,
  FiImage,
  FiCpu,
  FiClock,
  FiArrowUpRight
} from "react-icons/fi";
import "./DashboardCards.css";

const activities = [
  {
    id: 1,
    icon: <FiFileText />,
    title: "PDF Summary Generated",
    time: "2 min ago"
  },
  {
    id: 2,
    icon: <FiVideo />,
    title: "CCTV Object Search",
    time: "18 min ago"
  },
  {
    id: 3,
    icon: <FiMic />,
    title: "Audio Converted to Text",
    time: "Yesterday"
  },
  {
    id: 4,
    icon: <FiImage />,
    title: "OCR Completed",
    time: "2 days ago"
  }
];

function DashboardCards() {
  return (
    <section className="dashboard-cards">

      <div className="activity-card">

        <div className="activity-header">

          <div>

            <h2>Recent AI Activity</h2>

            <p>Latest AI operations</p>

          </div>

          <button>

            View All

          </button>

        </div>

        <div className="activity-list">

          {activities.map((item) => (

            <div
              key={item.id}
              className="activity-item"
            >

              <div className="activity-icon">

                {item.icon}

              </div>

              <div className="activity-info">

                <h4>{item.title}</h4>

                <span>

                  <FiClock />

                  {item.time}

                </span>

              </div>

              <FiArrowUpRight className="activity-arrow"/>

            </div>

          ))}

        </div>

      </div>

      <div className="engine-card">

        <div className="engine-icon">

          <FiCpu />

        </div>

        <h3>SmartSearch AI Engine</h3>

        <p>

          All AI modules are ready for processing documents,
          images, videos and audio.

        </p>

        <div className="engine-status">

          <div>

            <span>OCR</span>

            <strong>Online</strong>

          </div>

          <div>

            <span>Vision AI</span>

            <strong>Ready</strong>

          </div>

          <div>

            <span>Speech AI</span>

            <strong>Ready</strong>

          </div>

          <div>

            <span>Semantic Search</span>

            <strong>Active</strong>

          </div>

        </div>

      </div>

    </section>
  );
}

export default DashboardCards;