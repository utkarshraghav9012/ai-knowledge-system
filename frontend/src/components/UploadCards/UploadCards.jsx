import { useNavigate } from "react-router-dom";
import { FaFilePdf, FaVideo, FaMicrophone, FaImage, FaChevronRight } from "react-icons/fa";
import "./UploadCards.css";

const cards = [
  { id: "pdf", title: "Upload PDF", desc: "Extract text, summarize and ask questions", icon: <FaFilePdf />, tone: "pdf" },
  { id: "video", title: "Upload Video", desc: "Find anything in videos with AI", icon: <FaVideo />, tone: "video" },
  { id: "audio", title: "Upload Audio", desc: "Convert audio to text and get summary", icon: <FaMicrophone />, tone: "audio" },
  { id: "image", title: "Upload Image", desc: "OCR and image understanding", icon: <FaImage />, tone: "image" },
];

function UploadCards() {
  const navigate = useNavigate();

  return (
    <section className="upload-cards">
      {cards.map((card) => (
        <button
          key={card.id}
          className={`upload-card tone-${card.tone}`}
          onClick={() => navigate(`/upload?type=${card.id}`)}
        >
          <div className="upload-card-top">
            <span className="upload-card-icon">{card.icon}</span>
            <FaChevronRight className="upload-card-arrow" />
          </div>

          <h3>{card.title}</h3>
          <p>{card.desc}</p>
        </button>
      ))}
    </section>
  );
}

export default UploadCards;