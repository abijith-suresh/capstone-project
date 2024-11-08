package com.ust.auth_service.service;

import com.ust.auth_service.config.JwtTokenProvider;
import com.ust.auth_service.dto.LoginDto;
import com.ust.auth_service.dto.RegisterDto;
import com.ust.auth_service.model.Account;
import com.ust.auth_service.repo.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class AccountService {

    @Autowired
    private AccountRepo accountRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    // Convert DTO to Model
    private Account dtoToModel(RegisterDto registerDto){
        Account account = new Account();
        account.setEmail(registerDto.getEmail());
        account.setRoles(registerDto.getRoles());
        account.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        return account;
    }

    // Register a new account, return Mono<String>
    public Mono<Object> register(RegisterDto registerDto) {
        return accountRepo.findByEmail(registerDto.getEmail())
                .flatMap(existingAccount -> Mono.error(new RuntimeException("Account with email already exists")))
                .switchIfEmpty(Mono.defer(() -> {
                    Account account = dtoToModel(registerDto);
                    return accountRepo.save(account)
                            .then(Mono.just("User Registered Successfully"));
                }));
    }

    // Login method, return Mono<String> (JWT token)
    public Mono<String> login(LoginDto loginDto) {
        return accountRepo.findByEmail(loginDto.getEmail())
                .switchIfEmpty(Mono.error(new RuntimeException("Invalid Credentials")))
                .flatMap(account -> {
                    if (passwordEncoder.matches(loginDto.getPassword(), account.getPassword())) {
                        String token = jwtTokenProvider.createToken(account.getEmail(), account.getRoles());
                        return Mono.just(token);
                    } else {
                        return Mono.error(new RuntimeException("Invalid Credentials"));
                    }
                });
    }

    // Get roles from email, return Mono<String> with roles
    public Mono<String> getRolesFromEmail(String email) {
        return accountRepo.findByEmail(email)
                .map(Account::getRoles)
                .switchIfEmpty(Mono.error(new RuntimeException("User not found")));
    }

    // Verify token, return Mono<Boolean>
    public Mono<Boolean> verify(String token) {
        return Mono.just(jwtTokenProvider.validateToken(token));
    }

    // Get roles from the token, return Mono<String> with roles
    public Mono<String> getRolesFromToken(String token) {
        String email = jwtTokenProvider.getUsernameFromToken(token);
        return getRolesFromEmail(email);
    }
}

