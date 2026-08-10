package com.aiknowledge.demo.service;

import com.aiknowledge.demo.dto.FileUploadResponse;
import com.aiknowledge.demo.entity.FileEntity;
import com.aiknowledge.demo.entity.User;
import com.aiknowledge.demo.repository.FileRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class FileStorageService {

    private final FileRepository fileRepository;
    private final PDFProcessingService pdfProcessingService;
    private final OllamaService ollamaService;

    @Value("${file.upload-dir:uploads}")
    private String uploadDir;

    public FileStorageService(
            FileRepository fileRepository,
            PDFProcessingService pdfProcessingService,
            OllamaService ollamaService
    ) {
        this.fileRepository = fileRepository;
        this.pdfProcessingService = pdfProcessingService;
        this.ollamaService = ollamaService;
    }

    // ==========================
    // CREATE UPLOAD DIRECTORIES
    // ==========================

    public void createUploadDirectories() throws IOException {

        Files.createDirectories(
                Paths.get(uploadDir, "pdf")
        );

        Files.createDirectories(
                Paths.get(uploadDir, "videos")
        );

        Files.createDirectories(
                Paths.get(uploadDir, "images")
        );

        Files.createDirectories(
                Paths.get(uploadDir, "audio")
        );
    }

    // ==========================
    // SAVE FILE
    // ==========================

    public FileUploadResponse saveFile(
            MultipartFile file,
            User user
    ) throws IOException {

        createUploadDirectories();

        validateFile(file);

        String folder = getFolder(file);

        String extension =
                getExtension(file.getOriginalFilename());

        String storedName =
                UUID.randomUUID() + extension;

        Path destination =
                Paths.get(
                        uploadDir,
                        folder,
                        storedName
                );

        Files.copy(
                file.getInputStream(),
                destination
        );

        FileEntity entity = new FileEntity();

        entity.setOriginalName(
                file.getOriginalFilename()
        );

        entity.setStoredName(
                storedName
        );

        entity.setMimeType(
                file.getContentType()
        );

        entity.setFileType(
                folder.toUpperCase()
        );

        entity.setFileSize(
                file.getSize()
        );

        entity.setFilePath(
                destination.toString()
        );

        entity.setUploadDate(
                LocalDateTime.now()
        );

        entity.setUser(user);

        entity.setStatus("UPLOADED");

        // ==========================
        // PDF AI PROCESSING
        // ==========================

        if ("pdf".equals(folder)) {

            entity.setStatus("PROCESSING");

            // Document title
            entity.setDocumentTitle(
                    pdfProcessingService.getDocumentTitle(
                            destination.toString()
                    )
            );

            // Page count
            entity.setPageCount(
                    pdfProcessingService.getTotalPages(
                            destination.toString()
                    )
            );

            // Extract PDF text
            String extractedText =
                    pdfProcessingService.extractText(
                            destination.toString()
                    );

            entity.setExtractedText(
                    extractedText
            );

            // ==========================
            // OLLAMA SUMMARY
            // ==========================

            String prompt = """
                    You are an AI document assistant.

                    Summarize the following document clearly and accurately.

                    IMPORTANT RULES:

                    - Use ONLY the information provided in the document.
                    - Do not invent facts.
                    - Do not use outside knowledge.
                    - Keep the important information.
                    - Use clear headings.
                    - Use bullet points where useful.
                    - Make the summary easy to understand.

                    ========================
                    DOCUMENT
                    ========================

                    %s

                    ========================
                    END OF DOCUMENT
                    ========================
                    """.formatted(extractedText);

            String summary =
                    ollamaService.generate(prompt);

            entity.setSummary(summary);

            entity.setStatus("COMPLETED");
        }

        // ==========================
        // SAVE DATABASE RECORD
        // ==========================

        entity =
                fileRepository.save(entity);

        // ==========================
        // CREATE RESPONSE
        // ==========================

        FileUploadResponse response =
                new FileUploadResponse();

        response.setId(
                entity.getId()
        );

        response.setFileName(
                entity.getOriginalName()
        );

        response.setFileType(
                entity.getFileType()
        );

        response.setFileSize(
                entity.getFileSize()
        );

        response.setUploadDate(
                entity.getUploadDate()
        );

        response.setMessage(
                "File uploaded and processed successfully."
        );

        return response;
    }

    // ==========================
    // VALIDATE FILE
    // ==========================

    private void validateFile(
            MultipartFile file
    ) {

        if (file == null || file.isEmpty()) {

            throw new RuntimeException(
                    "File is empty."
            );
        }

        String contentType =
                file.getContentType();

        long size =
                file.getSize();

        if (contentType == null) {

            throw new RuntimeException(
                    "Invalid file type."
            );
        }

        switch (contentType) {

            // PDF
            case "application/pdf":

                if (size > 100L * 1024 * 1024) {

                    throw new RuntimeException(
                            "PDF size exceeds 100 MB."
                    );
                }

                break;

            // IMAGE
            case "image/jpeg":
            case "image/png":
            case "image/jpg":

                if (size > 20L * 1024 * 1024) {

                    throw new RuntimeException(
                            "Image size exceeds 20 MB."
                    );
                }

                break;

            // AUDIO
            case "audio/mpeg":
            case "audio/mp3":
            case "audio/wav":

                if (size > 200L * 1024 * 1024) {

                    throw new RuntimeException(
                            "Audio size exceeds 200 MB."
                    );
                }

                break;

            // VIDEO
            case "video/mp4":
            case "video/x-msvideo":
            case "video/x-matroska":

                if (size > 500L * 1024 * 1024) {

                    throw new RuntimeException(
                            "Video size exceeds 500 MB."
                    );
                }

                break;

            default:

                throw new RuntimeException(
                        "Unsupported file type."
                );
        }
    }

    // ==========================
    // GET FOLDER
    // ==========================

    private String getFolder(
            MultipartFile file
    ) {

        String contentType =
                file.getContentType();

        if (contentType == null) {

            throw new RuntimeException(
                    "Unknown file type."
            );
        }

        if (contentType.startsWith(
                "application/pdf"
        )) {

            return "pdf";
        }

        if (contentType.startsWith(
                "image"
        )) {

            return "images";
        }

        if (contentType.startsWith(
                "video"
        )) {

            return "videos";
        }

        if (contentType.startsWith(
                "audio"
        )) {

            return "audio";
        }

        throw new RuntimeException(
                "Unsupported file type."
        );
    }

    // ==========================
    // GET FILE EXTENSION
    // ==========================

    private String getExtension(
            String fileName
    ) {

        if (
                fileName == null ||
                !fileName.contains(".")
        ) {

            return "";
        }

        return fileName.substring(
                fileName.lastIndexOf(".")
        );
    }

    // ==========================
    // GET USER FILES
    // ==========================

    public List<FileEntity> getUserFiles(
            User user
    ) {

        return fileRepository
                .findByUserOrderByUploadDateDesc(user);
    }

    // ==========================
    // GET FILE BY ID
    // ==========================

    public FileEntity getFileById(
            Long id
    ) {

        return fileRepository
                .findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "File not found"
                        )
                );
    }

    // ==========================
    // DELETE FILE
    // ==========================

    public void deleteFile(
            Long id
    ) throws IOException {

        FileEntity file =
                fileRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "File not found"
                                )
                        );

        Files.deleteIfExists(
                Paths.get(
                        file.getFilePath()
                )
        );

        fileRepository.delete(file);
    }
}