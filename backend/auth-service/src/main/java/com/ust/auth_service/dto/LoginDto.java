package com.ust.auth_service.dto;

import lombok.Data;

@Data
public class LoginDto {
    private String email;
    private String password;
}
