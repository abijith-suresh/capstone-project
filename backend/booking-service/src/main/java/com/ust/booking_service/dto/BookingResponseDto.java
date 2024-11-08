package com.ust.booking_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponseDto {
    private ObjectId bookingId;
    private ObjectId customerId;
    private ObjectId specialistId;
    private LocalDateTime bookingDate;
    private LocalDateTime appointmentTime;
    private String status;
    private double price;
}
