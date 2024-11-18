package com.ust.specialist_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDto {
    private String bookingId;
    private CustomerDto customerDto;
    private SpecialistDto specialistDto;
    private LocalDateTime bookingDate;
    private LocalDateTime appointmentTime;
    private String status;
    private double price;

}