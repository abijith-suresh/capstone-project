package com.ust.specialist_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpecialistDto {

    private String firstName;
    private String lastName;
    private String email;
}
