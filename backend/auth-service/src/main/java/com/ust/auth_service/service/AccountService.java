package com.ust.auth_service.service;

import com.ust.auth_service.config.JwtTokenProvider;
import com.ust.auth_service.dto.LoginRequestDto;
import com.ust.auth_service.dto.RegistrationRequestDto;
import com.ust.auth_service.model.Account;
import com.ust.auth_service.repo.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {
    @Autowired
    private AccountRepo accountRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    private Account dtoToModel(RegistrationRequestDto requestDto){
        Account account = new Account();

        account.setName(requestDto.getName());
        account.setEmail(requestDto.getEmail());
        account.setUsername(requestDto.getUsername());
        account.setPassword(passwordEncoder.encode(requestDto.getPassword()));

        return account;
    }

    public String register(RegistrationRequestDto requestDto){
        Account account = dtoToModel(requestDto);
        accountRepo.saveAndFlush(account);
        return "User Registered Successfully";
    }

    public String login(LoginRequestDto requestDto){
        Optional<Account> account = accountRepo.findByUsername(requestDto.getUsername());
        return account
                .filter(acc -> passwordEncoder.matches(requestDto.getPassword(), acc.getPassword()))
                .map(acc -> jwtTokenProvider.createToken(acc.getUsername(), acc.getRoles()))
                .orElseThrow(() -> new RuntimeException("Invalid Credentials"));
    }

    public boolean verify(String token) {
        return jwtTokenProvider.validateToken(token);
    }
}
