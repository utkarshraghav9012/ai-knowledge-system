package com.aiknowledge.demo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OllamaService {

    @Value("${ollama.url}")
    private String ollamaUrl;

    @Value("${ollama.model.primary}")
    private String primaryModel;

    @Value("${ollama.model.fallback}")
    private String fallbackModel;

    private final RestTemplate restTemplate = new RestTemplate();

    public String generate(String prompt) {

        try {
            System.out.println("Using primary Ollama model: " + primaryModel);

            return callModel(primaryModel, prompt);

        } catch (Exception e) {

            System.out.println(
                    "Primary model failed. Switching to fallback model: "
                            + fallbackModel
            );

            return callModel(fallbackModel, prompt);
        }
    }

    private String callModel(String model, String prompt) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = new HashMap<>();

        body.put("model", model);
        body.put("stream", false);

        body.put(
                "messages",
                List.of(
                        Map.of(
                                "role",
                                "user",
                                "content",
                                prompt
                        )
                )
        );

        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(body, headers);

        ResponseEntity<Map> response =
                restTemplate.exchange(
                        ollamaUrl,
                        HttpMethod.POST,
                        entity,
                        Map.class
                );

        if (response.getBody() == null) {
            throw new RuntimeException(
                    "Empty response received from Ollama"
            );
        }

        Map message =
                (Map) response.getBody().get("message");

        if (message == null) {
            throw new RuntimeException(
                    "Ollama response does not contain message"
            );
        }

        Object content = message.get("content");

        if (content == null) {
            throw new RuntimeException(
                    "Ollama response does not contain content"
            );
        }

        return content.toString();
    }
}