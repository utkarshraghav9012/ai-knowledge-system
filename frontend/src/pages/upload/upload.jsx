import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    tone: "blue",
  },
  {
    id: "video",
    label: "Video",
    sub: ".mp4, .mov, .mkv",
    icon: <FaVideo />,
    tone: "blue",
  },
  {
    id: "audio",
    label: "Audio",
    sub: ".mp3, .wav, .m4a",
    icon: <FaMicrophone />,
    tone: "blue",
  },
  {
    id: "image",
    label: "Image",
    sub: ".png, .jpg, .jpeg",
    icon: <FaImage />,
    tone: "blue",
  },
];

function Upload() {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // ==========================
  // FORMAT FILE SIZE
  // ==========================

  const formatBytes = (bytes) => {
    if (!bytes) {
      return "0 Bytes";
    }

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];

    const i = Math.floor(
      Math.log(bytes) / Math.log(k)
    );

    return (
      parseFloat(
        (bytes / Math.pow(k, i)).toFixed(2)
      ) +
      " " +
      sizes[i]
    );
  };

  // ==========================
  // GET FILE TYPE
  // ==========================

  const getFileType = (file) => {
    if (!file) {
      return "";
    }

    if (
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf")
    ) {
      return "PDF";
    }

    if (file.type.startsWith("image/")) {
      return "Image";
    }

    if (file.type.startsWith("video/")) {
      return "Video";
    }

    if (file.type.startsWith("audio/")) {
      return "Audio";
    }

    return "Unknown";
  };

  // ==========================
  // HANDLE SELECTED FILE
  // ==========================

  const handleFile = (file) => {
    if (!file) {
      return;
    }

    setSuccess("");
    setError("");
    setProgress(0);

    const type = getFileType(file);

    if (type === "Unknown") {
      setSelectedFile(null);
      setError(
        "Unsupported file type. Please select PDF, Video, Audio or Image."
      );
      return;
    }

    // ==========================
    // SIZE VALIDATION
    // ==========================

    const size = file.size;

    if (
      type === "PDF" &&
      size > 100 * 1024 * 1024
    ) {
      setSelectedFile(null);
      setError("PDF size exceeds 100 MB.");
      return;
    }

    if (
      type === "Image" &&
      size > 20 * 1024 * 1024
    ) {
      setSelectedFile(null);
      setError("Image size exceeds 20 MB.");
      return;
    }

    if (
      type === "Audio" &&
      size > 200 * 1024 * 1024
    ) {
      setSelectedFile(null);
      setError("Audio size exceeds 200 MB.");
      return;
    }

    if (
      type === "Video" &&
      size > 500 * 1024 * 1024
    ) {
      setSelectedFile(null);
      setError("Video size exceeds 500 MB.");
      return;
    }

    setSelectedFile(file);
  };

  // ==========================
  // REMOVE FILE
  // ==========================

  const removeFile = () => {
    setSelectedFile(null);
    setProgress(0);
    setSuccess("");
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // ==========================
  // DRAG & DROP
  // ==========================

  const handleDrop = (e) => {
    e.preventDefault();

    setDragging(false);

    if (
      e.dataTransfer &&
      e.dataTransfer.files &&
      e.dataTransfer.files.length > 0
    ) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // ==========================
  // FILE CHOOSE
  // ==========================

  const handleChoose = (e) => {
    if (
      e.target.files &&
      e.target.files.length > 0
    ) {
      handleFile(e.target.files[0]);
    }
  };

  // ==========================
  // UPLOAD FILE
  // ==========================

  const uploadFile = async () => {
    if (!selectedFile) {
      setError("Please select a file.");
      return;
    }

    try {
      setUploading(true);
      setProgress(0);
      setSuccess("");
      setError("");

      const token =
        localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "Please login first."
        );
      }

      const fileType =
        getFileType(selectedFile);

      const formData = new FormData();

      formData.append(
        "file",
        selectedFile
      );

      console.log(
        "Uploading file:",
        selectedFile.name
      );

      // ==========================
      // BACKEND UPLOAD
      // ==========================

      const response = await api.post(
        "/api/files/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },

          onUploadProgress: (event) => {
            if (event.total) {
              const percent = Math.round(
                (event.loaded * 100) /
                  event.total
              );

              setProgress(percent);
            }
          },
        }
      );

      console.log(
        "Upload Success:",
        response.data
      );

      setProgress(100);

      const uploadedFileId =
        response.data?.id;

      // ==========================
      // SUCCESS MESSAGE
      // ==========================

      setSuccess(
        `${selectedFile.name} uploaded successfully.`
      );

      // ==========================
      // CLEAR FILE INPUT
      // ==========================

      setSelectedFile(null);

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      // ==========================
      // OPEN PDF WORKSPACE
      // ==========================

      if (
        fileType === "PDF" &&
        uploadedFileId
      ) {
        console.log(
          "Opening PDF Workspace:",
          uploadedFileId
        );

        navigate(
          `/files?id=${uploadedFileId}`
        );

        return;
      }
    } catch (err) {
      console.error(
        "Upload Error:",
        err
      );

      let errorMessage =
        "Upload failed. Please try again.";

      if (err.response?.data?.message) {
        errorMessage =
          err.response.data.message;
      } else if (
        typeof err.response?.data ===
        "string"
      ) {
        errorMessage =
          err.response.data;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      setProgress(0);
    } finally {
      setUploading(false);
    }
  };

  // ==========================
  // UI
  // ==========================

  return (
    <div className="upload-page">

      <h2 className="upload-title">
        Upload Your File
      </h2>

      <p className="upload-subtitle">
        Upload PDF, Video, Audio or Image
        for AI Processing
      </p>

      {/* ==========================
          DROPZONE
      ========================== */}

      <div
        className={`upload-dropzone ${
          dragging ? "dragging" : ""
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() =>
          setDragging(false)
        }
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
          type="button"
          className="choose-file-btn"
          onClick={() =>
            inputRef.current?.click()
          }
          disabled={uploading}
        >
          Choose File
        </button>

        <input
          hidden
          ref={inputRef}
          type="file"
          accept=".pdf,.mp4,.mov,.mkv,.mp3,.wav,.m4a,.png,.jpg,.jpeg"
          onChange={handleChoose}
        />
      </div>

      {/* ==========================
          SELECTED FILE
      ========================== */}

      {selectedFile && (
        <div className="selected-file-card">

          <div className="selected-file-left">

            {getFileType(selectedFile) ===
              "PDF" && (
              <FaFilePdf className="selected-file-icon" />
            )}

            {getFileType(selectedFile) ===
              "Video" && (
              <FaVideo className="selected-file-icon" />
            )}

            {getFileType(selectedFile) ===
              "Audio" && (
              <FaMicrophone className="selected-file-icon" />
            )}

            {getFileType(selectedFile) ===
              "Image" && (
              <FaImage className="selected-file-icon" />
            )}

            <div>
              <h3>
                {selectedFile.name}
              </h3>

              <p>
                {formatBytes(
                  selectedFile.size
                )}
                {" • "}
                {getFileType(
                  selectedFile
                )}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="remove-file-btn"
            onClick={removeFile}
            disabled={uploading}
          >
            <FaTrash />
          </button>
        </div>
      )}

      {/* ==========================
          UPLOAD BUTTON
      ========================== */}

      {selectedFile && !uploading && (
        <button
          type="button"
          className="upload-btn"
          onClick={uploadFile}
        >
          Upload File
        </button>
      )}

      {/* ==========================
          PROGRESS
      ========================== */}

      {uploading && (
        <div className="progress-wrapper">

          <div className="progress-header">
            <span>
              {progress >= 100
                ? "Processing..."
                : "Uploading..."}
            </span>

            <span>
              {progress}%
            </span>
          </div>

          <div className="progress-track">

            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          {progress >= 100 && (
            <p className="processing-text">
              File uploaded. AI processing
              is in progress...
            </p>
          )}
        </div>
      )}

      {/* ==========================
          SUCCESS
      ========================== */}

      {success && (
        <div className="upload-alert success-alert">

          <FaCheckCircle />

          <span>
            {success}
          </span>

        </div>
      )}

      {/* ==========================
          ERROR
      ========================== */}

      {error && (
        <div className="upload-alert error-alert">

          <FaExclamationCircle />

          <span>
            {error}
          </span>

        </div>
      )}

      {/* ==========================
          SUPPORTED FORMATS
      ========================== */}

      <h3 className="formats-title">
        Supported Formats
      </h3>

      <div className="formats-grid">

        {formats.map((format) => (
          <div
            key={format.id}
            className={`format-card tone-${format.tone}`}
          >

            <span className="format-icon">
              {format.icon}
            </span>

            <div>
              <h4>
                {format.label}
              </h4>

              <p>
                {format.sub}
              </p>
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