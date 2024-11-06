package com.ust.booking_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingNotificationDto {
    private ObjectId bookingId;
    private ObjectId customerId;
    private ObjectId specialistId;
    private LocalDateTime appointmentTime;
}
