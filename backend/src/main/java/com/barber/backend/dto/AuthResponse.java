// dto/AuthResponse.java
package com.barber.backend.dto;

import com.barber.backend.model.User;

public record AuthResponse(String token, User user) { }