package com.ust.review_service.service;

import com.ust.review_service.dto.CustomerDto;
import com.ust.review_service.dto.ReviewDto;
import com.ust.review_service.dto.SpecialistReviewResponseDto;
import com.ust.review_service.entity.Review;
import com.ust.review_service.repository.ReviewRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private WebClient.Builder webClientBuilder;

    private void dtoToModel(Review review, ReviewDto reviewDto) {
        review.setCustomerId(new ObjectId(reviewDto.getCustomerId()));
        review.setSpecialistId(new ObjectId(reviewDto.getSpecialistId()));
        review.setRating(reviewDto.getRating());
        review.setComment(reviewDto.getComment());
        review.setCreatedAt(reviewDto.getCreatedAt());
    }

    private ReviewDto modelToDto(Review review) {
       ReviewDto reviewDto= new ReviewDto();
        reviewDto.setCustomerId(review.getCustomerId().toString());
        reviewDto.setSpecialistId(review.getSpecialistId().toString());
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

    public Flux<ReviewDto> getReviewsByCustomer(ObjectId customerId) {
        return reviewRepository.findByCustomerId(customerId)
                .map(review -> new ReviewDto(
                        review.getCustomerId().toString(),
                        review.getSpecialistId().toString(),
                        review.getRating(),
                        review.getComment(),
                        review.getCreatedAt()
                ));
    }

    public Flux<SpecialistReviewResponseDto> getReviewsForSpecialist(ObjectId specialistId) {
        return reviewRepository.findBySpecialistId(specialistId)
                .flatMap(review -> {
                    // Call the CustomerService to get the customer's name by customerId
                    return webClientBuilder.build()
                            .get()
                            .uri("http://localhost:9002/api/customer/{customerId}", review.getCustomerId())
                            .retrieve()
                            .bodyToMono(CustomerDto.class)
                            .map(customerDto -> {
                                // Create a new ReviewDto with the customer's name as author
                                SpecialistReviewResponseDto reviewDto = new SpecialistReviewResponseDto();
                                reviewDto.setAuthor(customerDto.getName());
                                reviewDto.setRating(review.getRating());
                                reviewDto.setComment(review.getComment());
                                reviewDto.setCreatedAt(review.getCreatedAt());

                                return reviewDto;
                            });
                });
    }




}
