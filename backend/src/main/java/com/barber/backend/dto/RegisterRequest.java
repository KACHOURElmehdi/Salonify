package com.barber.backend.dto;
import jakarta.validation.constraints.*;

public record RegisterRequest(
    @NotBlank String firstName,
    @NotBlank String lastName,
    @Email @NotBlank String email,
    String phone,
    @Size(min = 6) String password) { }
