import "./SearchBox.css";

import { FiSearch, FiMic, FiPaperclip, FiArrowRight } from "react-icons/fi";

function SearchBox() {
  return (
    <section className="search-box">
      <div className="search-header">
        <h2>AI Search</h2>
        <p>Ask anything from your PDFs, Videos, Images or Audio files.</p>
      </div>

      <div className="search-container">
        <FiSearch className="search-icon" />
        <input type="text" placeholder="Search your knowledge..." />

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
    </section>
  );
}

export default SearchBox;