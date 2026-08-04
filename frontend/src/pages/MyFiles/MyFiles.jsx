import "./MyFiles.css";

function MyFiles() {

    const files = [

        {
            id: 1,
            name: "Cricket Rules.pdf",
            type: "PDF",
            size: "2.4 MB",
            date: "Today",
            status: "Completed"
        },

        {
            id: 2,
            name: "CCTV_Footage.mp4",
            type: "Video",
            size: "425 MB",
            date: "Yesterday",
            status: "Processing"
        },

        {
            id: 3,
            name: "Meeting Recording.mp3",
            type: "Audio",
            size: "18 MB",
            date: "2 Days Ago",
            status: "Completed"
        },

        {
            id: 4,
            name: "Invoice Image.jpg",
            type: "Image",
            size: "3.8 MB",
            date: "Today",
            status: "Completed"
        }

    ];

    return (

        <div className="myfiles-page">

            <h1>My Files</h1>

            <p className="subtitle">
                Manage all your uploaded files in one place.
            </p>

            <div className="stats-grid">

                <div className="stat-card">
                    <h2>156</h2>
                    <p>Total Files</p>
                </div>

                <div className="stat-card">
                    <h2>52</h2>
                    <p>PDF</p>
                </div>

                <div className="stat-card">
                    <h2>31</h2>
                    <p>Videos</p>
                </div>

                <div className="stat-card">
                    <h2>73</h2>
                    <p>Images & Audio</p>
                </div>

            </div>

            <div className="search-row">

                <input
                    type="text"
                    placeholder="Search files..."
                />

                <select>

                    <option>All</option>

                    <option>PDF</option>

                    <option>Video</option>

                    <option>Audio</option>

                    <option>Image</option>

                </select>

            </div>

            <div className="files-grid">

                {files.map(file => (

                    <div
                        className="file-card"
                        key={file.id}
                    >

                        <h3>{file.name}</h3>

                        <p><strong>Type:</strong> {file.type}</p>

                        <p><strong>Size:</strong> {file.size}</p>

                        <p><strong>Date:</strong> {file.date}</p>

                        <span className={`status ${file.status.toLowerCase()}`}>
                            {file.status}
                        </span>

                        <div className="actions">

                            <button>Preview</button>

                            <button>Download</button>

                            <button>Delete</button>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default MyFiles;