package com.ust.specialist_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDto {
    private ObjectId bookingId;
    private ObjectId customerId;
    private LocalDateTime appointmentTime;
}