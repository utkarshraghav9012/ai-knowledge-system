package com.aiknowledge.demo.controller;
import jakarta.validation.Valid;
import com.aiknowledge.demo.dto.LoginRequest;
import com.aiknowledge.demo.dto.LoginResponse;
import com.aiknowledge.demo.dto.UserResponse;
import com.aiknowledge.demo.entity.User;
import com.aiknowledge.demo.security.JwtUtil;
import com.aiknowledge.demo.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    // Signup API
    @PostMapping("/signup")
    public UserResponse signup(@Valid @RequestBody User user) {

        User savedUser = userService.registerUser(user);

        return new UserResponse(
                savedUser.getId(),
                savedUser.getFullName(),
                savedUser.getEmail(),
                savedUser.getRole()
        );
    }

    // Login API with JWT
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        User user = userService.loginUser(
                request.getEmail(),
                request.getPassword()
        );

        String token = jwtUtil.generateToken(
                user.getEmail()
        );

        return new LoginResponse(
                "Login Successful",
                token,
                user.getEmail()
        );
    }
}