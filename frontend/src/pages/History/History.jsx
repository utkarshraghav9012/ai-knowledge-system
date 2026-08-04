import "./History.css";

const historyData = [
  {
    id: 1,
    query: "What is LBW rule?",
    type: "PDF",
    file: "Cricket Rules.pdf",
    time: "Today • 10:42 AM",
  },
  {
    id: 2,
    query: "Summarize CCTV footage",
    type: "Video",
    file: "CCTV_Footage.mp4",
    time: "Yesterday • 7:15 PM",
  },
  {
    id: 3,
    query: "Extract all names",
    type: "PDF",
    file: "Employee_List.pdf",
    time: "2 Days Ago",
  },
  {
    id: 4,
    query: "Find dog in video",
    type: "Video",
    file: "Parking_Camera.mp4",
    time: "Last Week",
  },
];

function History() {
  return (
    <div className="history-page">

      <div className="history-header">
        <h1>Search History</h1>
        <p>View and manage all your previous AI searches.</p>
      </div>

      <div className="history-search">
        <input
          type="text"
          placeholder="Search history..."
        />
      </div>

      <div className="history-list">

        {historyData.map((item) => (
          <div className="history-card" key={item.id}>

            <div className="history-info">

              <h3>{item.query}</h3>

              <p>{item.file}</p>

              <span>
                {item.type} • {item.time}
              </span>

            </div>

            <div className="history-actions">

              <button className="open-btn">
                Open Again
              </button>

              <button className="delete-btn">
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default History;