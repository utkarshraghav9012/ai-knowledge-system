package com.aiknowledge.demo.dto;

import lombok.Data;

@Data
public class LoginResponse {

    private String message;
    private String token;
    private String email;


    public LoginResponse(String message, String token, String email) {
        this.message = message;
        this.token = token;
        this.email = email;
    }
}