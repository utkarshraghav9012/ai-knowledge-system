package com.aiknowledge.demo.service;

import org.springframework.stereotype.Service;

@Service
public class AISummaryService {

    private final OllamaService ollamaService;

    public AISummaryService(OllamaService ollamaService) {
        this.ollamaService = ollamaService;
    }

    /**
     * Generate Summary
     */
    public String generateSummary(String extractedText) {

        if (extractedText == null || extractedText.isBlank()) {
            throw new RuntimeException(
                    "Document contains no readable text."
            );
        }

        String prompt = """
                You are an AI document assistant.

                Summarize the following document clearly and accurately.

                Requirements:
                - Use only the information provided in the document.
                - Do not invent facts.
                - Keep the important points.
                - Use headings and bullet points where useful.
                - Make the summary easy to understand.

                -------------------------
                DOCUMENT:
                -------------------------

                %s

                -------------------------
                END OF DOCUMENT
                -------------------------
                """.formatted(extractedText);

        return ollamaService.generate(prompt);
    }

    /**
     * Ask Question From PDF
     */
    public String askQuestion(
            String extractedText,
            String question
    ) {

        if (extractedText == null || extractedText.isBlank()) {
            throw new RuntimeException(
                    "Document contains no readable text."
            );
        }

        if (question == null || question.isBlank()) {
            throw new RuntimeException(
                    "Question cannot be empty."
            );
        }

        String prompt = """
                You are an AI assistant that answers questions
                about an uploaded document.

                IMPORTANT RULES:
                - Answer ONLY using information from the document.
                - Do not use outside knowledge.
                - Do not invent or assume anything.
                - If the answer cannot be found in the document,
                  reply exactly:
                  Answer not found in the uploaded document.

                -------------------------
                DOCUMENT:
                -------------------------

                %s

                -------------------------
                QUESTION:
                -------------------------

                %s

                -------------------------
                ANSWER:
                -------------------------
                """.formatted(
                extractedText,
                question
        );

        return ollamaService.generate(prompt);
    }
}