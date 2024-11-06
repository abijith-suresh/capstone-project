package com.ust.gateway_service.filter;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Predicate;

@Component
public class RouteValidator {
    public static final List<String> OPEN_API_ENDPOINTS = List.of(
            "/api/auth/register",
            "/api/auth/login",
            "/api/auth/validate/token",
            "api/auth/extract/roles"
    );

    public Predicate<ServerHttpRequest> isSecured = request ->
            OPEN_API_ENDPOINTS.stream()
                    .noneMatch(uri -> request.getURI().getPath().equals(uri));
}
