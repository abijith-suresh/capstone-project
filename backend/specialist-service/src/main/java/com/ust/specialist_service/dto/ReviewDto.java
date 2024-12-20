package com.ust.specialist_service.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ReviewDto {
    private String reviewId;
    private String author;
    private String comment;
    private Integer rating;
    private LocalDate createdAt;
}
