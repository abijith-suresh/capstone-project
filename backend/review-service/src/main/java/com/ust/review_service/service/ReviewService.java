package com.ust.review_service.service;

import com.ust.review_service.dto.ReviewDto;
import com.ust.review_service.entity.Review;
import com.ust.review_service.repository.ReviewRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    private void dtoToModel(Review review, ReviewDto reviewDto) {
        review.setCustomerId(reviewDto.getCustomerId());
        review.setSpecialistId(reviewDto.getSpecialistId());
        review.setRating(reviewDto.getRating());
        review.setComment(reviewDto.getComment());
        review.setCreatedAt(reviewDto.getCreatedAt());
    }

    private ReviewDto modelToDto(Review review) {
       ReviewDto reviewDto= new ReviewDto();
        reviewDto.setCustomerId(review.getCustomerId());
        reviewDto.setSpecialistId(review.getSpecialistId());
        reviewDto.setRating(review.getRating());
        reviewDto.setComment(review.getComment());
        reviewDto.setCreatedAt(review.getCreatedAt());

        return reviewDto;
    }



    public Flux<ReviewDto> findAllReviews() {
        return reviewRepository.findAll()
                .map(this::modelToDto);
    }


    public Mono<Review> findReviewById(ObjectId id)
    {
        return reviewRepository.findById(id);
    }

    public Mono<ReviewDto> createReview(ReviewDto reviewDto) {
        Review review = new Review();
        dtoToModel(review, reviewDto);
        return reviewRepository.save(review)
                .map(savedReview -> modelToDto(savedReview));
    }


    public Mono<Review> updateReview(ObjectId id, Review reviewDetails) {
        reviewDetails.setId(id);
        return reviewRepository.save(reviewDetails);
    }

    public void deleteReviewById(ObjectId id) {

        reviewRepository.deleteById(id);
    }

    public Flux<ReviewDto> getReviewsForCustomer(ObjectId customerId) {
        return reviewRepository.findByCustomerId(customerId)
                .map(review -> new ReviewDto(
                        review.getCustomerId(),
                        review.getSpecialistId(),
                        review.getRating(),
                        review.getComment(),
                        review.getCreatedAt()
                ));
    }
    public Mono<ReviewDto> getReviewByIdForCustomer(ObjectId customerId, ObjectId reviewId) {
        return reviewRepository.findByCustomerIdAndId(customerId, reviewId)  // Use the new query method
                .map(review -> new ReviewDto(
                        review.getCustomerId(),
                        review.getSpecialistId(),
                        review.getRating(),
                        review.getComment(),
                        review.getCreatedAt()
                ));
    }
    public Flux<ReviewDto> getReviewsForSpecialist(ObjectId specialistId) {
        return reviewRepository.findBySpecialistId(specialistId)
                .map(review -> new ReviewDto(
                        review.getCustomerId(),
                        review.getSpecialistId(),
                        review.getRating(),
                        review.getComment(),
                        review.getCreatedAt()
                ));
    }




}
