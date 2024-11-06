package com.ust.review_service.service;

import com.ust.review_service.dto.ReviewDto;
import com.ust.review_service.entity.Review;
import com.ust.review_service.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    private void dtoToModel(Review review, ReviewDto reviewDto) {
        review.setCustomer_id(reviewDto.getCustomer_id());
        review.setSpecialist_id(reviewDto.getSpecialist_id());
        review.setRating(reviewDto.getRating());
        review.setComment(reviewDto.getComment());
        review.setCreatedAt(reviewDto.getCreatedAt());
    }

    private ReviewDto modelToDto(Review review) {
       ReviewDto reviewDto= new ReviewDto();
        reviewDto.setCustomer_id(reviewDto.getCustomer_id());
        reviewDto.setSpecialist_id(reviewDto.getSpecialist_id());
        reviewDto.setRating(reviewDto.getRating());
        reviewDto.setComment(reviewDto.getComment());
        reviewDto.setCreatedAt(reviewDto.getCreatedAt());

        return reviewDto;
    }



    public List<ReviewDto> findAllReviews() {
        List<Review> review = reviewRepository.findAll();

        return review.stream()
                .map(this::modelToDto)
                .collect(Collectors.toList());

    }

    public Review findReviewById(String id)
    {
        return reviewRepository.findById(id).orElse(null);
    }

    public Review createReview(ReviewDto reviewDto) {
        Review review = new Review();
        dtoToModel(review, reviewDto);
        return reviewRepository.save(review);
    }
    public Review updateReview(String id, Review reviewDetails) {
        reviewDetails.setId(id);
        return reviewRepository.save(reviewDetails);
    }

    public void deleteReviewById(String id) {

        reviewRepository.deleteById(id);
    }
}
