import { useState } from "react";
import { FaVideo, FaSearch, FaCloudUploadAlt, FaPlay } from "react-icons/fa";
import "./VideoSearch.css";

const results = [
  { id: 1, time: "00:02:15" },
  { id: 2, time: "00:15:42" },
  { id: 3, time: "00:47:10" },
];

function VideoSearch() {
  const [query, setQuery] = useState("");

  return (
    <div className="video-search-page">
      <div className="video-search-header">
        <div className="video-title-block">
          <FaVideo className="video-file-icon" />
          <h2>Match Highlights.mp4</h2>
        </div>

        <button className="upload-new-btn">
          <FaCloudUploadAlt /> Upload New Video
        </button>
      </div>

      <section className="video-search-panel card">
        <h3>Search Inside Video</h3>
        <p className="video-search-sub">Upload an image and/or describe what you want to find in the video.</p>

        <div className="video-search-bar">
          <input
            type="text"
            placeholder="Find moments where..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="video-search-btn">
            <FaSearch /> Search
          </button>
        </div>

        <h4 className="results-title">Found {results.length} Results</h4>

        <div className="results-grid">
          {results.map((r) => (
            <div key={r.id} className="result-card">
              <div className="result-thumb">
                <FaPlay />
              </div>
              <span className="result-time">{r.time}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default VideoSearch;