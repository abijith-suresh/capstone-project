package com.ust.auth_service.dto;

import lombok.Data;

@Data
public class RegistrationRequestDto {
    private String name;
    private String email;
    private String username;
    private String password;
}
