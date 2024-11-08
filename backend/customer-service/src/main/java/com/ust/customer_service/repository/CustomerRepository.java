package com.ust.customer_service.repository;

import com.ust.customer_service.entity.Customer;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface CustomerRepository extends ReactiveMongoRepository<Customer, ObjectId> {
    Mono<Customer> findByEmail(String email);
}
