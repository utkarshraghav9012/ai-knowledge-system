import { useRef, useState } from "react";
import { FaCloudUploadAlt, FaFilePdf, FaVideo, FaMicrophone, FaImage } from "react-icons/fa";
import "./Upload.css";

const formats = [
  { id: "pdf", label: "PDF", sub: ".pdf", icon: <FaFilePdf />, tone: "pdf" },
  { id: "video", label: "Video", sub: ".mp4, .mov, .mkv", icon: <FaVideo />, tone: "video" },
  { id: "audio", label: "Audio", sub: ".mp3, .wav, .m4a", icon: <FaMicrophone />, tone: "audio" },
  { id: "image", label: "Image", sub: ".png, .jpg, .jpeg", icon: <FaImage />, tone: "image" },
];

function Upload() {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState(null);
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) {
      setFileName(e.dataTransfer.files[0].name);
    }
  };

  const handleChoose = (e) => {
    if (e.target.files.length) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="upload-page">
      <h2 className="upload-title">Upload Your File</h2>
      <p className="upload-subtitle">Choose a file or drag and drop it here.</p>

      <div
        className={`upload-dropzone ${dragging ? "dragging" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <FaCloudUploadAlt className="upload-cloud-icon" />

        <p className="upload-drop-text">
          {fileName ? fileName : "Drag and drop your file here"}
        </p>

        <p className="upload-or">or</p>

        <button className="choose-file-btn" onClick={() => inputRef.current.click()}>
          Choose File
        </button>

        <input ref={inputRef} type="file" hidden onChange={handleChoose} />
      </div>

      <h3 className="formats-title">Supported Formats</h3>

      <div className="formats-grid">
        {formats.map((f) => (
          <div key={f.id} className={`format-card tone-${f.tone}`}>
            <span className="format-icon">{f.icon}</span>
            <div>
              <h4>{f.label}</h4>
              <p>{f.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="upload-note">Maximum file size: 500MB</p>
    </div>
  );
}

export default Upload;