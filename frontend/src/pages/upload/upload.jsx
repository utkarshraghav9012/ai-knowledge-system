import { useRef, useState } from "react";
import {
  FaCloudUploadAlt,
  FaFilePdf,
  FaVideo,
  FaMicrophone,
  FaImage,
  FaTrash,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

import api from "../../services/api";
import "./Upload.css";

const formats = [
  {
    id: "pdf",
    label: "PDF",
    sub: ".pdf",
    icon: <FaFilePdf />,
    tone: "pdf",
  },
  {
    id: "video",
    label: "Video",
    sub: ".mp4, .mov, .mkv",
    icon: <FaVideo />,
    tone: "video",
  },
  {
    id: "audio",
    label: "Audio",
    sub: ".mp3, .wav, .m4a",
    icon: <FaMicrophone />,
    tone: "audio",
  },
  {
    id: "image",
    label: "Image",
    sub: ".png, .jpg, .jpeg",
    icon: <FaImage />,
    tone: "image",
  },
];

function Upload() {

  const inputRef = useRef(null);

  const [dragging, setDragging] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const [uploading, setUploading] = useState(false);

  const [progress, setProgress] = useState(0);

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  const formatBytes = (bytes) => {

    if (!bytes) return "0 Bytes";

    const k = 1024;

    const sizes = ["Bytes", "KB", "MB", "GB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return (
      parseFloat((bytes / Math.pow(k, i)).toFixed(2)) +
      " " +
      sizes[i]
    );
  };

  const getFileType = (file) => {

    if (!file) return "";

    if (file.type.includes("pdf")) return "PDF";

    if (file.type.includes("image")) return "Image";

    if (file.type.includes("video")) return "Video";

    if (file.type.includes("audio")) return "Audio";

    return "Unknown";
  };

  const handleFile = (file) => {

    if (!file) return;

    setSelectedFile(file);

    setProgress(0);

    setSuccess("");

    setError("");

  };

  const removeFile = () => {

    setSelectedFile(null);

    setProgress(0);

    setSuccess("");

    setError("");

    if (inputRef.current) {

      inputRef.current.value = "";

    }

  };

  const handleDrop = (e) => {

    e.preventDefault();

    setDragging(false);

    if (e.dataTransfer.files.length > 0) {

      handleFile(e.dataTransfer.files[0]);

    }

  };

  const handleChoose = (e) => {

    if (e.target.files.length > 0) {

      handleFile(e.target.files[0]);

    }

  };

  const uploadFile = async () => {

    if (!selectedFile) {

      setError("Please select a file.");

      return;

    }

    try {

      setUploading(true);

      setSuccess("");

      setError("");

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("file", selectedFile);

      const response = await api.post(

        "/api/files/upload",

        formData,

        {

          headers: {

            Authorization: `Bearer ${token}`,

            "Content-Type": "multipart/form-data",

          },

          onUploadProgress: (event) => {

            const percent = Math.round(

              (event.loaded * 100) / event.total

            );

            setProgress(percent);

          },

        }

      );

      console.log(response.data);

      setSuccess("File uploaded successfully.");

      setProgress(100);

    } catch (err) {

      console.error(err);

      setError(

        err.response?.data?.message ||

        "Upload failed."

      );

    } finally {

      setUploading(false);

    }

  };

  return (
  <div className="upload-page">

    <h2 className="upload-title">Upload Your File</h2>

    <p className="upload-subtitle">
      Upload PDF, Video, Audio or Image for AI Processing
    </p>

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

      <h3 className="upload-drop-text">
        {selectedFile
          ? selectedFile.name
          : "Drag & Drop your file here"}
      </h3>

      <p className="upload-or">
        or choose from your computer
      </p>

      <button
        className="choose-file-btn"
        onClick={() => inputRef.current.click()}
      >
        Choose File
      </button>

      <input
        hidden
        ref={inputRef}
        type="file"
        onChange={handleChoose}
      />
    </div>

    {selectedFile && (

      <div className="selected-file-card">

        <div className="selected-file-left">

          <FaFilePdf className="selected-file-icon" />

          <div>

            <h3>{selectedFile.name}</h3>

            <p>

              {formatBytes(selectedFile.size)}

              {" • "}

              {getFileType(selectedFile)}

            </p>

          </div>

        </div>

        <button
          className="remove-file-btn"
          onClick={removeFile}
        >
          <FaTrash />
        </button>

      </div>

    )}

    {selectedFile && !uploading && (

      <button
        className="upload-btn"
        onClick={uploadFile}
      >
        Upload File
      </button>

    )}

    {uploading && (

      <div className="progress-wrapper">

        <div className="progress-header">

          <span>Uploading...</span>

          <span>{progress}%</span>

        </div>

        <div className="progress-track">

          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

    )}

        {success && (
      <div className="upload-alert success-alert">
        <FaCheckCircle />
        <span>{success}</span>
      </div>
    )}

    {error && (
      <div className="upload-alert error-alert">
        <FaExclamationCircle />
        <span>{error}</span>
      </div>
    )}

    <h3 className="formats-title">
      Supported Formats
    </h3>

    <div className="formats-grid">
      {formats.map((f) => (
        <div
          key={f.id}
          className={`format-card tone-${f.tone}`}
        >
          <span className="format-icon">
            {f.icon}
          </span>

          <div>
            <h4>{f.label}</h4>
            <p>{f.sub}</p>
          </div>
        </div>
      ))}
    </div>

    <p className="upload-note">
      Maximum file size: 500 MB
    </p>

  </div>
);

}

export default Upload;