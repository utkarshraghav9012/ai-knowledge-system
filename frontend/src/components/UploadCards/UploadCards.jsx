import { useNavigate } from "react-router-dom";
import {
  FiFileText,
  FiVideo,
  FiMic,
  FiImage,
  FiArrowUpRight
} from "react-icons/fi";
import "./UploadCards.css";

const cards = [
  {
    id: "pdf",
    title: "PDF Intelligence",
    description: "Upload PDFs, generate summaries and ask AI questions.",
    icon: <FiFileText />,
    badge: "PDF"
  },
  {
    id: "video",
    title: "Video Intelligence",
    description: "Analyze videos, search objects and create AI summaries.",
    icon: <FiVideo />,
    badge: "VIDEO"
  },
  {
    id: "audio",
    title: "Audio Intelligence",
    description: "Speech-to-text, transcripts and AI generated summaries.",
    icon: <FiMic />,
    badge: "AUDIO"
  },
  {
    id: "image",
    title: "Image Intelligence",
    description: "OCR, object understanding and image based AI search.",
    icon: <FiImage />,
    badge: "IMAGE"
  }
];

function UploadCards() {

  const navigate = useNavigate();

  return (

    <section className="upload-cards">

      {cards.map((card) => (

        <button
          key={card.id}
          className="upload-card"
          onClick={() => navigate(`/upload?type=${card.id}`)}
        >

          <div className="card-top">

            <span className="card-icon">
              {card.icon}
            </span>

            <span className="card-badge">
              {card.badge}
            </span>

          </div>

          <h3>{card.title}</h3>

          <p>{card.description}</p>

          <div className="card-footer">

            <span>Open Workspace</span>

            <FiArrowUpRight />

          </div>

        </button>

      ))}

    </section>

  );

}

export default UploadCards;