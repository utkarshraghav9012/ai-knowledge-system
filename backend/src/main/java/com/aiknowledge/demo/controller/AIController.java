package com.aiknowledge.demo.controller;

import com.aiknowledge.demo.dto.ApiResponse;
import com.aiknowledge.demo.service.AISummaryService;
import com.aiknowledge.demo.service.PDFProcessingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:5173")
public class AIController {

    private final PDFProcessingService pdfProcessingService;
    private final AISummaryService aiSummaryService;

    public AIController(
            PDFProcessingService pdfProcessingService,
            AISummaryService aiSummaryService
    ) {
        this.pdfProcessingService = pdfProcessingService;
        this.aiSummaryService = aiSummaryService;
    }

    /**
     * Generate PDF Summary
     */
    @PostMapping("/summarize")
    public ResponseEntity<ApiResponse<String>> summarizePdf(
            @RequestParam String pdfPath
    ) {

        String extractedText = pdfProcessingService.extractText(pdfPath);

        String summary = aiSummaryService.generateSummary(extractedText);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Summary generated successfully.",
                        summary
                )
        );
    }

    /**
     * Ask Question From PDF
     */
    @PostMapping("/ask")
    public ResponseEntity<ApiResponse<String>> askQuestion(

            @RequestParam String pdfPath,

            @RequestParam String question

    ) {

        String extractedText = pdfProcessingService.extractText(pdfPath);

        String answer = aiSummaryService.askQuestion(
                extractedText,
                question
        );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Answer generated successfully.",
                        answer
                )
        );
    }

}