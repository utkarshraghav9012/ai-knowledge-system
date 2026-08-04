import "./FileViewer.css";

function FileViewer() {
  return (
    <div className="viewer-page">

      <div className="viewer-top">

        <div>

          <h1>Cricket Rules.pdf</h1>

          <p>
            Uploaded Today • 2.4 MB • PDF
          </p>

        </div>

        <button className="download-btn">
          Download
        </button>

      </div>

      <div className="viewer-grid">

        <div className="preview-card">

          <h2>File Preview</h2>

          <div className="preview-placeholder">

            PDF Preview Area

          </div>

        </div>

        <div className="summary-card">

          <h2>AI Summary</h2>

          <p>

            AI generated summary will appear here after
            processing the uploaded file.

          </p>

          <div className="keyword-section">

            <span>Cricket</span>

            <span>Rules</span>

            <span>ICC</span>

            <span>Batting</span>

            <span>Bowling</span>

          </div>

        </div>

      </div>

      <div className="ask-ai-card">

        <h2>Ask AI</h2>

        <div className="ask-box">

          <input
            type="text"
            placeholder="Ask anything about this file..."
          />

          <button>

            Ask

          </button>

        </div>

      </div>

      <div className="conversation-card">

        <h2>Conversation</h2>

        <div className="chat-message user">

          What is LBW rule?

        </div>

        <div className="chat-message ai">

          AI answer will appear here after backend
          integration.

        </div>

      </div>

    </div>
  );
}

export default FileViewer;