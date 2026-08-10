package com.aiknowledge.demo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public String generateSummary(String text) {

        if (text == null || text.isBlank()) {
            return "No text found.";
        }

        if (text.length() > 25000) {
            text = text.substring(0, 25000);
        }

        String prompt = """
                Summarize the following document.
                
                Give:
                1. Short Summary
                2. Important Points
                3. Key Topics
                
                Document:
                """ + text;

        Map<String, Object> body = Map.of(
                "contents",
                List.of(
                        Map.of(
                                "parts",
                                List.of(
                                        Map.of("text", prompt)
                                )
                        )
                )
        );

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(body, headers);

        ResponseEntity<Map> response =
                restTemplate.exchange(
                        apiUrl + "?key=" + apiKey,
                        HttpMethod.POST,
                        entity,
                        Map.class
                );

        try {

            List candidates =
                    (List) response.getBody().get("candidates");

            Map candidate = (Map) candidates.get(0);

            Map content = (Map) candidate.get("content");

            List parts = (List) content.get("parts");

            Map firstPart = (Map) parts.get(0);

            return firstPart.get("text").toString();

        } catch (Exception e) {

            return "Summary generation failed.";
        }
    }
}