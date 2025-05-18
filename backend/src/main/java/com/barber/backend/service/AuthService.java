// service/AuthService.java
package com.barber.backend.service;

import com.barber.backend.dto.*;
import com.barber.backend.model.*;
import com.barber.backend.repository.UserRepository;
import com.barber.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final AuthenticationManager authManager;
    private final JwtService jwtService;

    public AuthResponse register(RegisterRequest req) {
        if (repo.findByEmail(req.email()) != null)
            throw new IllegalStateException("Email déjà utilisé");

        User user = new User();
        user.setFirstName(req.firstName());
        user.setLastName(req.lastName());
        user.setEmail(req.email());
        user.setPhone(req.phone());
        user.setPasswordHash(encoder.encode(req.password()));   // ← nom exact du champ
        user = repo.save(user);
        
        String token = jwtService.generate(user.getEmail());
        return new AuthResponse(token, user);
    }

    public AuthResponse authenticate(AuthRequest req) {
        authManager.authenticate(
            new UsernamePasswordAuthenticationToken(req.email(), req.password())
        );
        User user = repo.findByEmail(req.email());
        String token = jwtService.generate(req.email());
        return new AuthResponse(token, user);
    }
}
