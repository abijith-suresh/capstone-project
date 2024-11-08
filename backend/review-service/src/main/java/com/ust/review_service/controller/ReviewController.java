package com.ust.review_service.controller;

import com.ust.review_service.dto.ReviewDto;
import com.ust.review_service.entity.Review;
import com.ust.review_service.service.ReviewService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @GetMapping
    public Flux<ReviewDto> getAllReviews(){

        return reviewService.findAllReviews();
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<Review>> getReviewById(@PathVariable ObjectId id){
        return reviewService.findReviewById(id)
                .map(specialist -> ResponseEntity.ok(specialist))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Mono<ReviewDto> createReview(@RequestBody ReviewDto reviewDto) {
        return reviewService.createReview(reviewDto);
    }


    @PutMapping("/{id}")
    public Mono<ResponseEntity<Review>> updateMessage(@PathVariable ObjectId id, @RequestBody Review reviewDetails) {
        return reviewService.updateReview(id, reviewDetails)
                .map(updatedSpecialist -> ResponseEntity.ok(updatedSpecialist))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReviewById(@PathVariable ObjectId id){
        reviewService.deleteReviewById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/customer/{customerId}/reviews")
    public Flux<ReviewDto> getBookingsForCustomer(@PathVariable ObjectId customerId) {
        return reviewService.getReviewsForCustomer(customerId);
    }

    @GetMapping("/customer/{customerId}/review/{reviewId}")
    public Mono<ResponseEntity<ReviewDto>> getReviewByIdForCustomer(
            @PathVariable ObjectId customerId,
            @PathVariable ObjectId reviewId) {

        return reviewService.getReviewByIdForCustomer(customerId, reviewId)
                .map(reviewDto -> ResponseEntity.ok(reviewDto))
                .switchIfEmpty(Mono.just(ResponseEntity.notFound().build()));
    }

    @PostMapping("/customer/{customerId}/reviews")
    public Mono<ReviewDto> createReview(@PathVariable ObjectId customerId, @RequestBody ReviewDto reviewDto) {
        reviewDto.setCustomerId(customerId);
        return reviewService.createReview(reviewDto);
    }

    @GetMapping("/specialist/{specialistId}/reviews")
    public Flux<ReviewDto> getSpecialistReviews(@PathVariable ObjectId specialistId) {
        return reviewService.getReviewsForSpecialist(specialistId);
    }




}
