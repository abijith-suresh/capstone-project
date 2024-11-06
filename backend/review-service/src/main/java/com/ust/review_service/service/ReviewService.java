package com.ust.review_service.service;

import com.ust.review_service.entity.Review;
import com.ust.review_service.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> findAll() {

        return reviewRepository.findAll();
    }

    public Review findById(String id)
    {
        return reviewRepository.findById(id).orElse(null);
    }

    public Review save(Review review) {

        return reviewRepository.save(review);
    }

    public void deleteById(String id) {

        reviewRepository.deleteById(id);
    }
}
