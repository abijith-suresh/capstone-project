package com.ust.auth_service.controller;

import com.ust.auth_service.dto.LoginDto;
import com.ust.auth_service.dto.RegisterDto;
import com.ust.auth_service.dto.UpdateEmailDto;
import com.ust.auth_service.dto.UpdatePasswordDto;
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
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        try {
            String response = accountService.register(registerDto);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto) {
        return ResponseEntity.ok(accountService.login(loginDto));
    }

    @GetMapping("/validate/token")
    public ResponseEntity<Boolean> validateToken(@RequestParam String token) {
        return ResponseEntity.ok(accountService.verify(token));
    }

    @GetMapping("/extract/roles")
    public ResponseEntity<Map<String, Object>> extractRolesFromToken(@RequestParam String token) {
        try {
            if (!accountService.verify(token)) {
                throw new RuntimeException("Invalid or Expired Token");
            }
            String roles = accountService.getRolesFromToken(token);
            Map<String, Object> response = new HashMap<>();
            response.put("roles", roles);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/update/password")
    public ResponseEntity<String> updatePassword(@RequestBody UpdatePasswordDto updatePasswordDto) {
        try {
            accountService.updatePassword(updatePasswordDto);
            return ResponseEntity.ok("Password updated successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/update/email")
    public ResponseEntity<String> updateEmail(@RequestBody UpdateEmailDto updateEmailDto) {
        try {
            accountService.updateEmail(updateEmailDto);
            return ResponseEntity.ok("Email updated successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
