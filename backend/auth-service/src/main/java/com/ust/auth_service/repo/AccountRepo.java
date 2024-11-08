package com.ust.auth_service.repo;

import com.ust.auth_service.model.Account;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface AccountRepo extends ReactiveMongoRepository<Account, ObjectId> {
    Mono<Account> findByEmail(String email);
}
