package com.ust.customer_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDto {
    private String id;
    private String name;
    private String email;
    private String phone;
    private String gender;
    private LocalDate dob;
    private String address;
    private String profilePictureUrl;
}
