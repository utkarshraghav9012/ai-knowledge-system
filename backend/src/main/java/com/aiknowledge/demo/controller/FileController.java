package com.aiknowledge.demo.controller;

import com.aiknowledge.demo.dto.FileUploadResponse;
import com.aiknowledge.demo.entity.FileEntity;
import com.aiknowledge.demo.entity.User;
import com.aiknowledge.demo.service.FileStorageService;
import com.aiknowledge.demo.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "http://localhost:5173")
public class FileController {

    private final FileStorageService fileStorageService;
    private final UserService userService;

    public FileController(FileStorageService fileStorageService,
                          UserService userService) {
        this.fileStorageService = fileStorageService;
        this.userService = userService;
    }

    @PostMapping("/upload")
    public ResponseEntity<FileUploadResponse> uploadFile(
            @RequestParam("file") MultipartFile file,
            Authentication authentication) throws IOException {

        User user = userService.findByEmail(authentication.getName());

        FileUploadResponse response =
                fileStorageService.saveFile(file, user);

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<FileEntity>> getMyFiles(
            Authentication authentication) {

        User user = userService.findByEmail(authentication.getName());

        return ResponseEntity.ok(fileStorageService.getUserFiles(user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFile(
            @PathVariable Long id) throws IOException {

        fileStorageService.deleteFile(id);

        return ResponseEntity.ok("File deleted successfully.");
    }
}