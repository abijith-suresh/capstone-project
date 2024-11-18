package com.ust.booking_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddBookingDto {
    private String customerId;
    private String specialistId;

    private LocalDateTime bookingDate;
    private LocalDateTime appointmentTime;
    private String service;

    private String status;
    private String price;
}
