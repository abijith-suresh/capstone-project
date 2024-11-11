package com.ust.specialist_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpecialistResponseDto {
    private String id;
    private String name;
    private String email;
    private String phoneNumber;
    private String title;
    private String bio;
    private String price;
    private double rating;
    private String profileImage;
    private List<String> services;
    private List<String> photos;
    private int experience;
}
