package com.ust.review_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpecialistReviewResponseDto {
    private String reviewId;
    private String author;
    private String comment;
    private Integer rating;
    private LocalDate createdAt;
}
