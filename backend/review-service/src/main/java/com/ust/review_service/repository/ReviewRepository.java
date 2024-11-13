package com.ust.review_service.repository;

import com.ust.review_service.entity.Review;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface ReviewRepository extends ReactiveMongoRepository<Review, ObjectId> {
    Flux<Review> findByCustomerId(ObjectId customerId);
    Flux<Review> findBySpecialistId(ObjectId specialistId);
}
