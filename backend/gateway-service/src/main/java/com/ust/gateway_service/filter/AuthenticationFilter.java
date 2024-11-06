package com.ust.gateway_service.filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {
    @Autowired
    private RouteValidator routeValidator;
    private final WebClient.Builder webClientBuilder;

    public AuthenticationFilter(WebClient.Builder webClientBuilder){
        super(Config.class);
        this.webClientBuilder = webClientBuilder;
    }

    public static class Config {}

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            if (routeValidator.isSecured.test(exchange.getRequest())) {
                if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION) ||
                        exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).isEmpty()) {
                    return Mono.error(new RuntimeException("Missing Authorization Header"));
                }

                String authHeaderToken = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
                String authToken = extractAuthToken(authHeaderToken);

                return getRolesFromToken(authToken)
                        .flatMap(response -> {
                            String roles = (String) response.get("roles");

                            if (!hasRequiredRole(roles, exchange.getRequest().getURI().getPath())) {
                                return Mono.error(new RuntimeException("User does not have the required role for this resource"));
                            }

                            return chain.filter(exchange);
                        })
                        .onErrorResume(e -> {
                            return Mono.error(new RuntimeException("Invalid access: " + e.getMessage()));
                        });
            }
            return chain.filter(exchange);
        };
    }

    private String extractAuthToken(String authHeaderToken) {
        if (authHeaderToken.startsWith("Bearer ")) {
            return authHeaderToken.substring(7);
        } else {
            throw new RuntimeException("Invalid Authorization Header Format");
        }
    }

    private Mono<Map<String, Object>> getRolesFromToken(String authToken) {
        WebClient webClient = webClientBuilder.baseUrl("http://localhost:9000/api/auth").build();

        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/extract/roles")
                        .queryParam("token", authToken)
                        .build())
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
                .onErrorResume(e -> {
                    return Mono.error(new RuntimeException("Error extracting roles from token: " + e.getMessage()));
                });
    }

    private boolean hasRequiredRole(String roles, String requestUri) {
        if (requestUri.contains("/specialist")) {
            return roles.contains("specialist");
        } else if (requestUri.contains("/customer")) {
            return roles.contains("customer");
        }
        return true;
    }
}

