package com.ust.auth_service.service;

import com.ust.auth_service.config.JwtTokenProvider;
import com.ust.auth_service.dto.LoginDto;
import com.ust.auth_service.dto.RegisterDto;
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

    private Account dtoToModel(RegisterDto registerDto){
        Account account = new Account();

        account.setEmail(registerDto.getEmail());
        account.setRoles(registerDto.getRoles());
        account.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        return account;
    }

    public String register(RegisterDto registerDto){
        if(accountRepo.findByEmail(registerDto.getEmail()).isPresent()){
            throw new RuntimeException("Account with email already exists");
        }

        Account account = dtoToModel(registerDto);
        accountRepo.save(account);
        return "User Registered Successfully";
    }

    public String login(LoginDto loginDto){
        Optional<Account> account = accountRepo.findByEmail(loginDto.getEmail());
        return account
                .filter(acc -> passwordEncoder.matches(loginDto.getPassword(), acc.getPassword()))
                .map(acc -> jwtTokenProvider.createToken(acc.getEmail(), acc.getRoles()))
                .orElseThrow(() -> new RuntimeException("Invalid Credentials"));
    }

    public String getRolesFromEmail(String email) {
        Optional<Account> accountOptional = accountRepo.findByEmail(email);
        if (accountOptional.isPresent()) {
            Account account = accountOptional.get();
            return account.getRoles();
        }
        throw new RuntimeException("User not found");
    }

    public boolean verify(String token) {
        return jwtTokenProvider.validateToken(token);
    }

    public String getRolesFromToken(String token) {
        String email = jwtTokenProvider.getUsernameFromToken(token);
        return getRolesFromEmail(email);
    }
}
