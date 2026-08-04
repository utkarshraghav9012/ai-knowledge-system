import "./Bookmarks.css";

const bookmarks = [
  {
    id: 1,
    title: "Cricket Rules.pdf",
    type: "PDF",
    saved: "Today",
  },
  {
    id: 2,
    title: "CCTV_Footage.mp4",
    type: "Video",
    saved: "Yesterday",
  },
  {
    id: 3,
    title: "Meeting Recording.mp3",
    type: "Audio",
    saved: "2 Days Ago",
  },
  {
    id: 4,
    title: "Invoice Image.jpg",
    type: "Image",
    saved: "Last Week",
  },
];

function Bookmarks() {
  return (
    <div className="bookmarks-page">

      <div className="bookmarks-header">
        <h1>Bookmarks</h1>
        <p>
          Quickly access your saved files and AI results.
        </p>
      </div>

      <div className="bookmark-search">

        <input
          type="text"
          placeholder="Search bookmarks..."
        />

      </div>

      <div className="bookmark-grid">

        {bookmarks.map((item) => (

          <div
            className="bookmark-card"
            key={item.id}
          >

            <div>

              <h3>{item.title}</h3>

              <p>{item.type}</p>

              <span>
                Saved {item.saved}
              </span>

            </div>

            <div className="bookmark-actions">

              <button className="open-btn">
                Open
              </button>

              <button className="remove-btn">
                Remove
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Bookmarks;