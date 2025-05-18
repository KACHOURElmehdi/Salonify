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
        repo.save(user);
        return new AuthResponse(jwtService.generate(user.getEmail())); // ou generateToken(user) si tu ajoutes la méthode
    }

    public AuthResponse authenticate(AuthRequest req) {
        authManager.authenticate(
            new UsernamePasswordAuthenticationToken(req.email(), req.password())
        );
        return new AuthResponse(jwtService.generate(req.email())); // idem
    }
}
