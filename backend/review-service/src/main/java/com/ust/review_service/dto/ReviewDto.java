package com.ust.review_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDto {

    private String customerId;
    private String specialistId;
    private Integer rating;
    private String comment;
    private LocalDate createdAt;


}
