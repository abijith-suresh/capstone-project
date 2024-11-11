package com.ust.customer_service.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CustomerDto {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String gender;
    private LocalDate dob;
    private String address;
    private String profilePictureUrl;
}
