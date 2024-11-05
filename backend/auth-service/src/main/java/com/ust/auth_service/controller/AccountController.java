package com.ust.auth_service.controller;

import com.ust.auth_service.dto.RequestDto;
import com.ust.auth_service.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RequestDto requestDto){
        try {
            String response = accountService.register(requestDto);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/login")
    public ResponseEntity<String> login(@RequestBody RequestDto requestDto){
        return ResponseEntity.ok(accountService.login(requestDto));
    }

    @GetMapping("/validate/token")
    public ResponseEntity<Boolean> validateToken(@RequestParam String token){
        return ResponseEntity.ok(accountService.verify(token));
    }
}
