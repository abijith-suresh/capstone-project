package com.ust.review_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDto {

    private ObjectId customerId;
    private ObjectId specialistId;
    private Integer rating;
    private String comment;
    private LocalDate createdAt;


}
