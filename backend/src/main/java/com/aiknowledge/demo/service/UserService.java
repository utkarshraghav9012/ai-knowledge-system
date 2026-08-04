package com.aiknowledge.demo.service;

import com.aiknowledge.demo.entity.User;
import com.aiknowledge.demo.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    // User Registration
    public User registerUser(User user) {

        // Default role for every new user
        user.setRole("USER");

        // Password hash
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }


    // User Login
    public User loginUser(String email, String password) {

        System.out.println("LOGIN EMAIL RECEIVED: " + email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        System.out.println("USER FOUND: " + user.getEmail());

        if (!passwordEncoder.matches(password, user.getPassword())) {

            System.out.println("PASSWORD NOT MATCHED");

            throw new RuntimeException("Invalid password");
        }

        System.out.println("LOGIN SUCCESS");

        return user;
    }


    // Find User By Email
    public User findByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}