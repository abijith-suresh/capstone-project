package com.ust.booking_service.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "booking")
public class Booking {

    @Id
    private String id;

    private Long customerId;
    private Long specialistId;

    private LocalDateTime bookingDate;
    private LocalDateTime appointmentTime;

    private String status;
    private double price;
}
