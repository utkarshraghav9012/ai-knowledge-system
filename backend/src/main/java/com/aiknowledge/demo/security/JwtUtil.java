package com.aiknowledge.demo.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    private final String SECRET_KEY =
            "mysecretkeymysecretkeymysecretkey123456";

    // JWT valid for 24 hours
    private static final long EXPIRATION_TIME =
            24L * 60L * 60L * 1000L;

    private SecretKey getSigningKey() {

        return Keys.hmacShaKeyFor(
                SECRET_KEY.getBytes(StandardCharsets.UTF_8)
        );
    }

    // ==========================
    // GENERATE TOKEN
    // ==========================

    public String generateToken(String username) {

        Date issuedAt = new Date();

        Date expiration = new Date(
                issuedAt.getTime() + EXPIRATION_TIME
        );

        return Jwts.builder()
                .subject(username)
                .issuedAt(issuedAt)
                .expiration(expiration)
                .signWith(getSigningKey())
                .compact();
    }

    // ==========================
    // EXTRACT USERNAME
    // ==========================

    public String extractUsername(String token) {

        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    // ==========================
    // VALIDATE TOKEN
    // ==========================

    public boolean validateToken(String token) {

        try {

            Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token);

            return true;

        } catch (ExpiredJwtException e) {

            System.out.println("JWT token expired.");

            return false;

        } catch (JwtException | IllegalArgumentException e) {

            System.out.println("Invalid JWT token.");

            return false;
        }
    }
}