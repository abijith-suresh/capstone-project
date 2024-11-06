package com.ust.booking_service.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "booking")
public class Booking {

    @Id
    private ObjectId id;

    private ObjectId customerId;
    private ObjectId specialistId;

    private LocalDateTime bookingDate;
    private LocalDateTime appointmentTime;

    private String status;
    private double price;
}
