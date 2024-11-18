package com.ust.review_service.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "reviews")
public class Review {

    @Id
    private ObjectId id;

    private ObjectId customerId;
    private ObjectId specialistId;
    private Integer rating;
    private String comment;
    private LocalDate createdAt;
}
