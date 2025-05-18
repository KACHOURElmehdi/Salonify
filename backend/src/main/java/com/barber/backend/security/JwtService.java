// security/JwtService.java
package com.barber.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration-ms:86400000}")   // 24 h par défaut
    private long expirationMs;

    private Key key() { return Keys.hmacShaKeyFor(secret.getBytes()); }

    public String generate(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder().setSigningKey(key()).build()
                   .parseClaimsJws(token).getBody().getSubject();
    }

    public boolean isValid(String token, String username) {
        return username.equals(extractUsername(token)) &&
               !isExpired(token);
    }

    private boolean isExpired(String token) {
        Date exp = Jwts.parserBuilder().setSigningKey(key()).build()
                       .parseClaimsJws(token).getBody().getExpiration();
        return exp.before(new Date());
    }
}
