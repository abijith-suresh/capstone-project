package com.ust.review_service.controller;

import com.ust.review_service.dto.ReviewDto;
import com.ust.review_service.entity.Review;
import com.ust.review_service.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @GetMapping
    public List<ReviewDto> getAllReviews(){

        return reviewService.findAllReviews();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Review> getReviewById(@PathVariable String id){
       Review review= reviewService.findReviewById(id);
        return review != null ? ResponseEntity.ok(review) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Review createReview(@RequestBody ReviewDto reviewDto){

        return reviewService.createReview(reviewDto);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReviewById(@PathVariable String id){
        reviewService.deleteReviewById(id);
        return ResponseEntity.noContent().build();
    }
}
