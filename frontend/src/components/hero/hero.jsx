import "./hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-badge">🚀 AI Powered Platform</span>

        <h1>
          AI Knowledge <br />
          Search Platform
        </h1>

        <h2>
          <span>Search.</span>
          <span>Understand.</span>
          <span>Discover.</span>
        </h2>

        <p>
          Upload PDFs, videos, images and audio.
          Instantly search, summarize and understand
          your knowledge using AI.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">Start Searching</button>
          <button className="secondary-btn">Upload File</button>
        </div>
      </div>

      <div className="hero-image">
        <div className="brain-circle">🧠</div>
      </div>
    </section>
  );
}

export default Hero;