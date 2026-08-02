import { FaFilePdf, FaVideo, FaMicrophone, FaImage, FaChevronRight } from "react-icons/fa";
import "./RecentUploads.css";

const files = [
  { id: 1, name: "Cricket Rules.pdf", meta: "PDF · 2.4 MB · 2 hours ago", icon: <FaFilePdf />, tone: "pdf" },
  { id: 2, name: "Match Highlights.mp4", meta: "Video · 45.2 MB · 5 hours ago", icon: <FaVideo />, tone: "video" },
  { id: 3, name: "Interview Audio.mp3", meta: "Audio · 5.6 MB · 1 day ago", icon: <FaMicrophone />, tone: "audio" },
  { id: 4, name: "Notes Screenshot.png", meta: "Image · 1.3 MB · 2 days ago", icon: <FaImage />, tone: "image" },
];

function RecentUploads() {
  return (
    <section className="recent-uploads card">
      <div className="recent-uploads-header">
        <h3>Recent Files</h3>
        <button className="view-all-btn">View All</button>
      </div>

      <ul className="recent-uploads-list">
        {files.map((file) => (
          <li key={file.id} className="recent-file-item">
            <span className={`recent-file-icon tone-${file.tone}`}>{file.icon}</span>

            <div className="recent-file-info">
              <h4>{file.name}</h4>
              <p>{file.meta}</p>
            </div>

            <FaChevronRight className="recent-file-arrow" />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RecentUploads;