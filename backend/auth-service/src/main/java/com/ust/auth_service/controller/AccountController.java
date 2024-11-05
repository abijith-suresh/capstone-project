package com.ust.auth_service.controller;

import com.ust.auth_service.dto.LoginRequestDto;
import com.ust.auth_service.dto.RegistrationRequestDto;
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
    public ResponseEntity<String> register(@RequestBody RegistrationRequestDto requestDto){
        return ResponseEntity.ok(accountService.register(requestDto));
    }

    @GetMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDto requestDto){
        return ResponseEntity.ok(accountService.login(requestDto));
    }

    @GetMapping("/validate/token")
    public ResponseEntity<Boolean> validateToken(@RequestParam String token){
        return ResponseEntity.ok(accountService.verify(token));
    }
}
