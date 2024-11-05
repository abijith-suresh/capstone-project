package com.ust.auth_service.service;

import com.ust.auth_service.config.JwtTokenProvider;
import com.ust.auth_service.dto.RequestDto;
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

    private Account dtoToModel(RequestDto requestDto){
        Account account = new Account();

        account.setEmail(requestDto.getEmail());
        account.setPassword(passwordEncoder.encode(requestDto.getPassword()));

        return account;
    }

    public String register(RequestDto requestDto){
        if(accountRepo.findByEmail(requestDto.getEmail()).isPresent()){
            throw new RuntimeException("Account with email already exists");
        }

        Account account = dtoToModel(requestDto);
        accountRepo.save(account);
        return "User Registered Successfully";
    }

    public String login(RequestDto requestDto){
        Optional<Account> account = accountRepo.findByEmail(requestDto.getEmail());
        return account
                .filter(acc -> passwordEncoder.matches(requestDto.getPassword(), acc.getPassword()))
                .map(acc -> jwtTokenProvider.createToken(acc.getEmail(), acc.getRoles()))
                .orElseThrow(() -> new RuntimeException("Invalid Credentials"));
    }

    public boolean verify(String token) {
        return jwtTokenProvider.validateToken(token);
    }
}
