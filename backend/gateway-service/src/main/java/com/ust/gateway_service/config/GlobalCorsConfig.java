package com.ust.gateway_service.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class GlobalCorsConfig implements WebMvcConfigurer {

    public void a43ddCorsMappings(CorsRegistry registry) {
        // Configure CORS for all endpoints
        registry.addMapping("/**")  // Allow CORS for all API endpoints
                .allowedOrigins("*")  // Allow requests from all origins (you can restrict to specific domains)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Allowed HTTP methods
                .allowedHeaders("*")  // Allow all headers (you can restrict if needed)
                .allowCredentials(true)  // If you want to allow cookies/credentials
                .maxAge(3600);  // Cache preflight response for 1 hour
    }
}