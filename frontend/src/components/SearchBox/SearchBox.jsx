import "./SearchBox.css";
import {
  FiSearch,
  FiPaperclip,
  FiMic,
  FiArrowRight,
  FiFileText,
  FiVideo,
  FiImage,
  FiVolume2
} from "react-icons/fi";

function SearchBox() {
  return (
    <section className="search-box">

      <div className="search-header">

        <h2>Ask your Knowledge</h2>

        <p>
          Search across PDFs, Images, Audio and Videos using one intelligent AI search.
        </p>

      </div>

      <div className="search-container">

        <FiSearch className="search-icon" />

        <input
          type="text"
          placeholder="Ask anything from your knowledge base..."
        />

        <button className="icon-btn">
          <FiPaperclip />
        </button>

        <button className="icon-btn">
          <FiMic />
        </button>

        <button className="search-btn">
          <FiArrowRight />
        </button>

      </div>

      <div className="search-suggestions">

        <button>
          <FiFileText />
          Summarize PDF
        </button>

        <button>
          <FiVideo />
          CCTV Search
        </button>

        <button>
          <FiVolume2 />
          Audio to Text
        </button>

        <button>
          <FiImage />
          OCR Image
        </button>

      </div>

    </section>
  );
}

export default SearchBox;