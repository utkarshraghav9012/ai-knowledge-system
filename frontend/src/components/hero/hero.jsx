import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <span className="hero-badge">
          Enterprise AI Platform
        </span>

        <h1>
          SmartSearch AI
        </h1>

        <h2>
          Search • Understand • Analyze • Summarize
        </h2>

        <p>
          An enterprise AI knowledge platform that intelligently understands
          PDFs, images, audio and videos with semantic search, OCR,
          AI summaries and multimodal analysis.
        </p>

        <div className="hero-buttons">

          <button className="primary-btn">
            Upload Files
          </button>

          <button className="secondary-btn">
            AI Search
          </button>

        </div>

        <div className="hero-features">

          <div className="feature-pill">
            PDF Intelligence
          </div>

          <div className="feature-pill">
            Vision AI
          </div>

          <div className="feature-pill">
            Speech AI
          </div>

          <div className="feature-pill">
            Semantic Search
          </div>

        </div>

      </div>

      <div className="hero-visual">

        <div className="status-card">

          <h3>AI Engine</h3>

          <div className="status-item">
            <span>OCR</span>
            <strong>Online</strong>
          </div>

          <div className="status-item">
            <span>Vision AI</span>
            <strong>Ready</strong>
          </div>

          <div className="status-item">
            <span>Speech AI</span>
            <strong>Ready</strong>
          </div>

          <div className="status-item">
            <span>Search Engine</span>
            <strong>Active</strong>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;