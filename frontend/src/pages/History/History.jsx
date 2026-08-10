import { useEffect, useState } from "react";
import axios from "axios";
import "./History.css";

function History() {
const [historyData, setHistoryData] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
fetchHistory();
}, []);

const fetchHistory = async () => {
try {
setLoading(true);
setError("");


  const token = localStorage.getItem("token");

  const response = await axios.get(
    "http://localhost:8080/api/files",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  setHistoryData(response.data || []);
} catch (err) {
  console.error("History Error:", err);
  setError("Unable to load search history.");
} finally {
  setLoading(false);
}


};

const formatDate = (date) => {
if (!date) return "Unknown time";


const uploadDate = new Date(date);

return uploadDate.toLocaleString("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});


};

const filteredHistory = historyData.filter((item) => {
const search = searchTerm.toLowerCase();


return (
  item.originalName?.toLowerCase().includes(search) ||
  item.fileName?.toLowerCase().includes(search) ||
  item.fileType?.toLowerCase().includes(search) ||
  item.status?.toLowerCase().includes(search)
);


});

const handleDelete = async (id) => {
const confirmDelete = window.confirm(
"Are you sure you want to delete this file?"
);


if (!confirmDelete) return;

try {
  const token = localStorage.getItem("token");

  await axios.delete(
    `http://localhost:8080/api/files/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  setHistoryData((prev) =>
    prev.filter((item) => item.id !== id)
  );
} catch (err) {
  console.error("Delete Error:", err);
  alert("Unable to delete file.");
}


};

return ( <div className="history-page">


  <div className="history-header">
    <h1>Search History</h1>
    <p>
      View and manage all your previous AI searches and uploaded files.
    </p>
  </div>

  <div className="history-search">
    <input
      type="text"
      placeholder="Search history..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

  {loading && (
    <div className="history-empty">
      <p>Loading history...</p>
    </div>
  )}

  {!loading && error && (
    <div className="history-empty">
      <p>{error}</p>

      <button
        className="open-btn"
        onClick={fetchHistory}
      >
        Retry
      </button>
    </div>
  )}

  {!loading && !error && filteredHistory.length === 0 && (
    <div className="history-empty">
      <h3>No history found</h3>
      <p>
        Upload a file and it will appear here automatically.
      </p>
    </div>
  )}

  {!loading && !error && filteredHistory.length > 0 && (
    <div className="history-list">

      {filteredHistory.map((item) => (

        <div
          className="history-card"
          key={item.id}
        >

          <div className="history-info">

            <h3>
              {item.originalName ||
                item.fileName ||
                "Unnamed File"}
            </h3>

            <p>
              {item.fileType || "FILE"}
            </p>

            <span>
              {item.status || "UPLOADED"}
              {" • "}
              {formatDate(item.uploadDate)}
            </span>

          </div>

          <div className="history-actions">

            <button
              className="open-btn"
              onClick={() => {
                alert(
                  "File ID: " + item.id
                );
              }}
            >
              Open Again
            </button>

            <button
              className="delete-btn"
              onClick={() =>
                handleDelete(item.id)
              }
            >
              Delete
            </button>

          </div>

        </div>

      ))}

    </div>
  )}

</div>


);
}

export default History;
