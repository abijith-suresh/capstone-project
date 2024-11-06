package com.ust.gateway_service.filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {
    @Autowired
    private RouteValidator routeValidator;

    public AuthenticationFilter(){
        super(Config.class);
    }

    public static class Config {}

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            if (routeValidator.isSecured.test(exchange.getRequest())) {
                if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION) ||
                        exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).isEmpty()) {
                    throw new RuntimeException("Missing Authorization Header");
                }

                String authHeaderToken = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
                if (authHeaderToken.startsWith("Bearer ")) {
                    authHeaderToken = authHeaderToken.substring(7);
                } else {
                    throw new RuntimeException("Invalid Authorization Header Format");
                }

                try {
                    RestClient restClient = RestClient.create();
                    restClient.get()
                            .uri("http://localhost:9000/api/auth/validate/token?token="+authHeaderToken)
                            .retrieve().body(Boolean.class);
                } catch (Exception e){
                    System.out.println(e.getMessage());
                    throw new RuntimeException("Invalid access: " + e.getMessage());
                }
            }
            return chain.filter(exchange);
        });
    }
}
