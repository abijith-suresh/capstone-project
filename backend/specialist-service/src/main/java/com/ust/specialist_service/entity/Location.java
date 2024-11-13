package com.ust.specialist_service.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Location {
    private Double latitude;
    private Double longitude;
    private String city;
    private String state;
    private String country;
}