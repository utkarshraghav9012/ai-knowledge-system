import "./Notifications.css";

const notifications = [
  {
    id: 1,
    title: "Upload Completed",
    message: "Cricket Rules.pdf uploaded successfully.",
    time: "2 mins ago",
    type: "success",
    unread: true,
  },
  {
    id: 2,
    title: "AI Summary Ready",
    message: "Your PDF summary has been generated.",
    time: "12 mins ago",
    type: "ai",
    unread: true,
  },
  {
    id: 3,
    title: "Video Analysis Finished",
    message: "Objects detected successfully.",
    time: "Yesterday",
    type: "info",
    unread: false,
  },
  {
    id: 4,
    title: "Storage Warning",
    message: "You've used 80% of your storage.",
    time: "2 Days Ago",
    type: "warning",
    unread: false,
  },
];

function Notifications() {
  return (
    <div className="notifications-page">

      <div className="notifications-header">

        <div>
          <h1>Notifications</h1>
          <p>Stay updated with uploads and AI processing.</p>
        </div>

        <div className="notification-buttons">
          <button>Mark All Read</button>
          <button>Clear All</button>
        </div>

      </div>

      <div className="notification-search">

        <input
          type="text"
          placeholder="Search notifications..."
        />

      </div>

      <div className="notification-list">

        {notifications.map((item) => (

          <div
            className={`notification-card ${item.unread ? "unread" : ""}`}
            key={item.id}
          >

            <div className={`notification-dot ${item.type}`}></div>

            <div className="notification-content">

              <h3>{item.title}</h3>

              <p>{item.message}</p>

              <span>{item.time}</span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Notifications;