import { useState } from "react";
import { FaFilePdf, FaPaperPlane, FaTrash } from "react-icons/fa";
import "./PdfWorkspace.css";

const importantPoints = [
  "Cricket is played between two teams.",
  "Each team has 11 players.",
  "The game is divided into innings.",
  "Runs are scored by hitting the ball.",
  "Wickets are taken to dismiss batsmen.",
  "Umpire's decision is final.",
];

const initialMessages = [
  { id: 1, from: "user", text: "What is LBW rule?" },
  {
    id: 2,
    from: "ai",
    text: "According to the uploaded document, LBW (Leg Before Wicket) is a method of dismissal in cricket where the ball hits the batsman on the leg and would have gone on to hit the stumps if not intercepted.",
    points: [
      "The ball must be pitched in line with the stumps.",
      "It must hit the batsman's leg.",
      "It would have hit the stumps.",
      "The umpire's decision is final.",
    ],
    sources: "Sources: Page 12",
  },
];

const quickQuestions = [
  "Explain no ball rule",
  "What is powerplay?",
  "How many overs in ODI?",
  "What is run out?",
];

function PdfWorkspace() {
  const [activeTab, setActiveTab] = useState("summary");
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = (text) => {
    const question = text ?? input;
    if (!question.trim()) return;

    const userMsg = { id: Date.now(), from: "user", text: question };
    const aiMsg = {
      id: Date.now() + 1,
      from: "ai",
      text: "This is a simulated AI answer based on the uploaded document.",
      sources: "Sources: Page 4",
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput("");
  };

  return (
    <div className="pdf-workspace">
      <section className="pdf-panel card">
        <div className="pdf-panel-header">
          <FaFilePdf className="pdf-file-icon" />
          <h3>Cricket Rules.pdf</h3>
        </div>

        <div className="pdf-tabs">
          <button className={activeTab === "summary" ? "active" : ""} onClick={() => setActiveTab("summary")}>Summary</button>
          <button className={activeTab === "points" ? "active" : ""} onClick={() => setActiveTab("points")}>Important Points</button>
          <button className={activeTab === "qa" ? "active" : ""} onClick={() => setActiveTab("qa")}>Q&amp;A</button>
        </div>

        {activeTab === "summary" && (
          <div className="pdf-tab-content">
            <h4>AI Summary</h4>
            <p>
              The document explains the rules and regulations of cricket in
              detail. It covers all aspects including types of matches,
              innings, scoring, dismissals, fielding restrictions, and
              special rules.
            </p>
            <p>
              It is a complete guide for players, umpires, and fans to
              understand the game better.
            </p>
            <p className="pdf-meta">Total pages analyzed: 25</p>
            <button className="regenerate-btn">Regenerate Summary</button>
          </div>
        )}

        {activeTab === "points" && (
          <div className="pdf-tab-content">
            <h4>Important Points</h4>
            <ul className="points-list">
              {importantPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "qa" && (
          <div className="pdf-tab-content">
            <h4>Frequently Asked</h4>
            <ul className="qa-list">
              {quickQuestions.map((q) => (
                <li key={q} onClick={() => handleSend(q)}>{q}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="chat-panel card">
        <div className="chat-panel-header">
          <h3>Ask another question from this document</h3>
          <button className="clear-chat-btn" onClick={() => setMessages([])}>
            <FaTrash /> Clear Chat
          </button>
        </div>

        <div className="chat-quick-questions">
          {quickQuestions.map((q) => (
            <button key={q} onClick={() => handleSend(q)}>{q}</button>
          ))}
        </div>

        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-bubble ${msg.from}`}>
              <p>{msg.text}</p>

              {msg.points && (
                <ul>
                  {msg.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              )}

              {msg.sources && <span className="chat-source">{msg.sources}</span>}
            </div>
          ))}
        </div>

        <form
          className="chat-input-bar"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            type="text"
            placeholder="Ask another question from this document..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">
            <FaPaperPlane />
          </button>
        </form>
      </section>
    </div>
  );
}

export default PdfWorkspace;