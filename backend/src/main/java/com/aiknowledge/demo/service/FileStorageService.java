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

    @Value("${file.upload-dir:uploads}")
    private String uploadDir;

    public FileStorageService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    public void createUploadDirectories() throws IOException {

        Files.createDirectories(Paths.get(uploadDir, "pdf"));
        Files.createDirectories(Paths.get(uploadDir, "videos"));
        Files.createDirectories(Paths.get(uploadDir, "images"));
        Files.createDirectories(Paths.get(uploadDir, "audio"));

    }

    public FileUploadResponse saveFile(MultipartFile file, User user) throws IOException {

        createUploadDirectories();

        validateFile(file);

        String folder = getFolder(file);

        String extension = getExtension(file.getOriginalFilename());

        String storedName = UUID.randomUUID() + extension;

        Path destination = Paths.get(uploadDir, folder, storedName);

        Files.copy(file.getInputStream(), destination);

        FileEntity entity = new FileEntity();

        entity.setOriginalName(file.getOriginalFilename());

        entity.setStoredName(storedName);

        entity.setMimeType(file.getContentType());

        entity.setFileType(folder.toUpperCase());

        entity.setFileSize(file.getSize());

        entity.setFilePath(destination.toString());

        entity.setStatus("UPLOADED");

        entity.setUploadDate(LocalDateTime.now());

        entity.setUser(user);

        entity = fileRepository.save(entity);

        FileUploadResponse response = new FileUploadResponse();

        response.setId(entity.getId());

        response.setFileName(entity.getOriginalName());

        response.setFileType(entity.getFileType());

        response.setFileSize(entity.getFileSize());

        response.setUploadDate(entity.getUploadDate());

        response.setMessage("File uploaded successfully");

        return response;
    }
        private void validateFile(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new RuntimeException("File is empty.");
        }

        String contentType = file.getContentType();

        long size = file.getSize();

        if (contentType == null) {
            throw new RuntimeException("Invalid file type.");
        }

        switch (contentType) {

            case "application/pdf":
                if (size > 100 * 1024 * 1024) {
                    throw new RuntimeException("PDF size exceeds 100 MB.");
                }
                break;

            case "image/jpeg":
            case "image/png":
            case "image/jpg":
                if (size > 20 * 1024 * 1024) {
                    throw new RuntimeException("Image size exceeds 20 MB.");
                }
                break;

            case "audio/mpeg":
            case "audio/mp3":
            case "audio/wav":
                if (size > 200 * 1024 * 1024) {
                    throw new RuntimeException("Audio size exceeds 200 MB.");
                }
                break;

            case "video/mp4":
            case "video/x-msvideo":
            case "video/x-matroska":
                if (size > 500 * 1024 * 1024) {
                    throw new RuntimeException("Video size exceeds 500 MB.");
                }
                break;

            default:
                throw new RuntimeException("Unsupported file type.");
        }
    }

    private String getFolder(MultipartFile file) {

        String contentType = file.getContentType();

        if (contentType == null) {
            throw new RuntimeException("Unknown file type.");
        }

        if (contentType.startsWith("application/pdf")) {
            return "pdf";
        }

        if (contentType.startsWith("image")) {
            return "images";
        }

        if (contentType.startsWith("video")) {
            return "videos";
        }

        if (contentType.startsWith("audio")) {
            return "audio";
        }

        throw new RuntimeException("Unsupported file type.");
    }

    private String getExtension(String fileName) {

        if (fileName == null || !fileName.contains(".")) {
            return "";
        }

        return fileName.substring(fileName.lastIndexOf("."));
    }

    public List<FileEntity> getUserFiles(User user) {

        return fileRepository.findByUserOrderByUploadDateDesc(user);

    }

    public void deleteFile(Long id) throws IOException {

        FileEntity file = fileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("File not found"));

        Files.deleteIfExists(Paths.get(file.getFilePath()));

        fileRepository.delete(file);
    }
}