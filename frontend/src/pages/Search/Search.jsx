import "./Search.css";

function Search() {
  return (
    <div className="search-page">

      <div className="search-header">

        <h1>AI Knowledge Search</h1>

        <p>
          Ask questions from PDFs, Videos, Images and Audio using AI.
        </p>

      </div>

      <div className="search-box-large">

        <input
          type="text"
          placeholder="Ask anything..."
        />

        <button>Search</button>

      </div>

      <div className="suggestion-section">

        <h3>Suggested Questions</h3>

        <div className="suggestion-grid">

          <button>
            Summarize my uploaded PDF
          </button>

          <button>
            Find person in CCTV
          </button>

          <button>
            Explain this document
          </button>

          <button>
            Show important topics
          </button>

          <button>
            Extract all dates
          </button>

          <button>
            List all names
          </button>

        </div>

      </div>

      <div className="answer-section">

        <h2>AI Response</h2>

        <div className="answer-card">

          AI answer will appear here after search.

        </div>

      </div>

    </div>
  );
}

export default Search;