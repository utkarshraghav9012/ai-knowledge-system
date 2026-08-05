import {
  FiFileText,
  FiVideo,
  FiMic,
  FiImage,
  FiClock,
  FiArrowUpRight
} from "react-icons/fi";
import "./RecentUploads.css";

const files = [
  {
    id: 1,
    name: "Annual Report.pdf",
    type: "PDF",
    time: "2 min ago",
    icon: <FiFileText />
  },
  {
    id: 2,
    name: "Warehouse CCTV.mp4",
    type: "Video",
    time: "15 min ago",
    icon: <FiVideo />
  },
  {
    id: 3,
    name: "Meeting Recording.mp3",
    type: "Audio",
    time: "Yesterday",
    icon: <FiMic />
  },
  {
    id: 4,
    name: "Invoice Scan.png",
    type: "Image",
    time: "2 days ago",
    icon: <FiImage />
  }
];

function RecentUploads() {
  return (
    <section className="recent-uploads">

      <div className="recent-header">

        <div>

          <h2>Recent Files</h2>

          <p>Your latest uploaded documents</p>

        </div>

        <button className="view-all">
          View All
        </button>

      </div>

      <div className="recent-list">

        {files.map((file) => (

          <div
            key={file.id}
            className="recent-item"
          >

            <div className="recent-icon">

              {file.icon}

            </div>

            <div className="recent-info">

              <h4>{file.name}</h4>

              <span>

                {file.type}

                <FiClock />

                {file.time}

              </span>

            </div>

            <button className="open-btn">

              <FiArrowUpRight />

            </button>

          </div>

        ))}

      </div>

    </section>
  );
}

export default RecentUploads;