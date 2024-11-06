package com.ust.review_service.controller;

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
    public List<Review> getAllReviews(){
        return reviewService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Review> getReviewById(@PathVariable String id){
       Review review= reviewService.findById(id);
        return review != null ? ResponseEntity.ok(review) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Review saveReview(@RequestBody Review review){
        return reviewService.save(review);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReviewById(@PathVariable String id){
        reviewService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
