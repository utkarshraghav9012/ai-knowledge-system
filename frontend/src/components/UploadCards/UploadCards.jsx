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
    description: "Summarize PDFs, ask questions and extract important insights.",
    icon: <FiFileText />,
    tag: "Documents"
  },
  {
    id: "video",
    title: "Vision AI",
    description: "Search CCTV footage, detect objects and summarize videos.",
    icon: <FiVideo />,
    tag: "Video"
  },
  {
    id: "audio",
    title: "Speech AI",
    description: "Convert speech to text, generate transcripts and summaries.",
    icon: <FiMic />,
    tag: "Audio"
  },
  {
    id: "image",
    title: "OCR & Images",
    description: "Extract text from images and understand visual content.",
    icon: <FiImage />,
    tag: "Image"
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

            <div className="card-icon">
              {card.icon}
            </div>

            <div className="card-tag">
              {card.tag}
            </div>

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