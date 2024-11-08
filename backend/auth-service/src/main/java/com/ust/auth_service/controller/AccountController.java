package com.ust.auth_service.controller;

import com.ust.auth_service.dto.LoginDto;
import com.ust.auth_service.dto.RegisterDto;
import com.ust.auth_service.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/register")
    public Mono<ResponseEntity<Object>> register(@RequestBody RegisterDto registerDto) {
        return accountService.register(registerDto)
                .map(response -> ResponseEntity.ok(response))
                .onErrorResume(e -> Mono.just(ResponseEntity.badRequest().body(e.getMessage())));
    }

    @PostMapping("/login")
    public Mono<ResponseEntity<String>> login(@RequestBody LoginDto loginDto) {
        return accountService.login(loginDto)
                .map(token -> ResponseEntity.ok(token))
                .onErrorResume(e -> Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage())));
    }

    @GetMapping("/validate/token")
    public Mono<ResponseEntity<Boolean>> validateToken(@RequestParam String token) {
        return accountService.verify(token)
                .map(valid -> ResponseEntity.ok(valid))
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.FORBIDDEN).body(false));
    }

    @GetMapping("/extract/roles")
    public Mono<ResponseEntity<Map<String, Object>>> extractRolesFromToken(@RequestParam String token) {
        return accountService.verify(token)
                .flatMap(valid -> {
                    if (!valid) {
                        return Mono.just(ResponseEntity.status(HttpStatus.FORBIDDEN)
                                .body(Map.of("error", "Invalid or Expired Token")));
                    }

                    String roles = accountService.getRolesFromToken(token);
                    Map<String, Object> response = new HashMap<>();
                    response.put("roles", roles);
                    return Mono.just(ResponseEntity.ok(response));
                })
                .onErrorResume(e -> Mono.just(ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", e.getMessage()))));
    }
}
