import "./SearchBox.css";
import {
  FiSearch,
  FiPaperclip,
  FiMic,
  FiArrowRight
} from "react-icons/fi";

function SearchBox() {
  return (
    <section className="search-box">

      <div className="search-header">
        <h2>Ask your Knowledge</h2>

        <p>
          Search across PDFs, videos, images and audio using AI.
        </p>
      </div>

      <div className="search-container">

        <FiSearch className="search-icon"/>

        <input
          type="text"
          placeholder="Ask anything from your knowledge base..."
        />

        <button className="icon-btn">
          <FiPaperclip/>
        </button>

        <button className="icon-btn">
          <FiMic/>
        </button>

        <button className="search-btn">
          <FiArrowRight/>
        </button>

      </div>

      <div className="search-suggestions">

        <button>Summarize PDF</button>

        <button>Find object in CCTV</button>

        <button>Convert Audio to Text</button>

        <button>Video Summary</button>

      </div>

    </section>
  );
}

export default SearchBox;